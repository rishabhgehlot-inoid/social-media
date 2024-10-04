/* eslint-disable react/prop-types */
import axios from "axios";
import { Heart, Menu, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const Post = ({ post }) => {
  const navigation = useNavigate();
  const [likePost, setLikePost] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(JSON.parse(post.comments));
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);

  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const handleLikePost = async (postId) => {
    try {
      await instance.post("/likePost", { postId: postId });
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
      console.log(response.data.result[0]);
      setComments(JSON.parse(response.data.result[0].comments));
      setLikes(response.data.result[0].likes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleChanges();
  }, [comment, likes, likePost]);

  const handleDeletePost = async () => {
    try {
      const response = await instance.delete(`/deletePost/${post.postId}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    post.postId && (
      <section
        className=" flex flex-col justify-between w-full  md:w-[500px] lg:w-[800px] bg-black rounded-xl relative"
        key={post.postId}
      >
        <div className=" flex justify-between p-3 cursor-pointer items-center">
          <div
            className=" flex gap-2 items-center"
            onClick={() => {
              navigation(`/profile/${post.username}`);
            }}
          >
            <img
              src={
                post.profile_img.includes("googleusercontent")
                  ? post.profile_img // Google profile image URL
                  : `http://localhost:4010/${post.profile_img}` // Local image URL
              }
              className=" w-10 h-10 rounded-full"
            />
            {post.username}
          </div>
          {showMenu ? (
            <div onClick={() => setShowMenu(false)}>X</div>
          ) : (
            <>
              <Menu onClick={() => setShowMenu(true)} />
            </>
          )}
        </div>
        <div
          className={` bg-black flex flex-col absolute rounded-lg right-0 top-12 p-2 border ${
            showMenu ? " block" : " hidden"
          }`}
        >
          <button
            className=" text-xl p-2"
            onClick={() => navigation(`/EditPost/${post.postId}`)}
          >
            Edit
          </button>
          {post.token === localStorage.getItem("token") && (
            <button className=" text-xl p-2" onClick={handleDeletePost}>
              Delete
            </button>
          )}
        </div>
        <img
          src={`http://localhost:4010/${post.post}`}
          alt={post.post}
          className=""
        />
        <p className=" text-left p-3">{post.caption}</p>
        <div className=" flex gap-3 p-3 items-center">
          <Heart
            fill={likePost ? "red" : ""}
            onClick={() => {
              if (likePost) {
                setLikePost(false);
              } else {
                handleLikePost(post.postId);
                setLikePost(true);
              }
            }}
          />
          <div>{likes}</div>
          <MessageCircle />
          <FacebookShareButton url="#">
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <EmailShareButton>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
          <TelegramShareButton>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <WhatsappShareButton>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>
        {showComments ? (
          <div className="flex flex-col gap-2 p-3">
            <h3 className=" font-bold">Comments</h3>
            {comments.map((item, index) => {
              return (
                <div
                  className=""
                  key={index}
                  onClick={() => setShowComments(false)}
                >
                  {item.comment}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3" onClick={() => setShowComments(true)}>
            Show Comments
          </div>
        )}

        <div className=" flex">
          <input
            type="text"
            placeholder="Add Comment"
            className=" w-full rounded-full p-4 bg-black  outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                handleComment(post.postId, comment, post.userId);
            }}
          />
          <button
            className="rounded-full p-4 outline-none flex gap-2"
            onClick={() => handleComment(post.postId, comment, post.userId)}
          >
            <Send />
          </button>
        </div>
      </section>
    )
  );
};

export default Post;
