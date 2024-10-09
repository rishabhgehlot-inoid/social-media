/* eslint-disable react/prop-types */
import axios from "axios";
import { Heart, MessageCircle, Send, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigation = useNavigate();
  const [likePost, setLikePost] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
  const [userId, setUserId] = useState("");

  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token") || "",
    },
  });

  const handleLikePost = async (postId) => {
    try {
      if (likePost) {
        setLikePost(false);
        setLikes(likes - 1);
        await instance.post("/likePost", { postId });
      } else {
        setLikePost(true);
        setLikes(likes + 1);
        await instance.post("/likePost", { postId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (postId, comment, userId) => {
    try {
      await instance.post("/addComment", { postId, comment, userId });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChanges = async () => {
    try {
      const response = await instance.get(`/getPostById?postId=${post.postId}`);
      setComments(JSON.parse(response.data.result[0].comments));
      setLikes(JSON.parse(response.data.result[0].likes).length);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await instance.get(`/getUser`);
      setUserId(response.data[0].userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await handleChanges();
      setLikePost(
        JSON.parse(post.likes).some((follower) => follower.userId === userId)
      );
    };
    fetchData();
  }, [comment, likes, likePost, post, userId, post.likes, post.comments]);

  return (
    post.postId && (
      <section
        className=" flex flex-col justify-between w-full  md:w-[500px] lg:w-[800px] bg-black rounded-xl relative"
        key={post.postId}
      >
        <div className=" flex justify-between p-3 cursor-pointer items-center">
          <div
            className=" flex gap-2 items-center"
            onClick={() => navigation(`/profile/${post.username}`)}
          >
            <img
              src={
                post.profile_img?.includes("googleusercontent")
                  ? post.profile_img
                  : `http://localhost:4010/${post.profile_img}`
              }
              className=" w-10 h-10 rounded-full"
            />
            {post.username}
          </div>
          {post.token === localStorage.getItem("token") && (
            <Settings onClick={() => navigation(`/EditPost/${post.postId}`)} />
          )}
        </div>
        <img
          src={`http://localhost:4010/${post.post}`}
          alt={`Post image by ${post.username}`}
          className=""
        />
        <p className=" text-left p-3">{post.caption}</p>
        <div className=" flex gap-3 p-3 items-center">
          <Heart
            fill={likePost ? "red" : ""}
            onClick={() => handleLikePost(post.postId)}
          />
          <div>{likes}</div>
          <MessageCircle onClick={() => setShowComments(!showComments)} />
          <div>{comments.length}</div>
        </div>
        {showComments && (
          <div>
            <div className="flex flex-col gap-2 px-3 h-[50px] overflow-y-scroll">
              <h3 className=" font-bold">Comments</h3>
              {comments?.length > 0 ? (
                comments.map((item, index) => (
                  <div key={index}>{item.comment}</div>
                ))
              ) : (
                <p>Comments are not found</p>
              )}
            </div>

            <div className=" flex">
              <input
                type="text"
                placeholder="Add Comment"
                className=" w-full rounded-full p-4 bg-black  outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleComment(post.postId, comment, userId);
                }}
              />
              <button
                className="rounded-full p-4 outline-none flex gap-2"
                onClick={() => handleComment(post.postId, comment, userId)}
              >
                <Send />
              </button>
            </div>
          </div>
        )}
      </section>
    )
  );
};

export default Post;
