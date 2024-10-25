/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Heart, MessageCircle, Send, Settings, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import { instance, SERVER_URL } from "../config/instance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Post = ({ post }) => {
  const navigate = useNavigate();
  const [likePost, setLikePost] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
  const [userId, setUserId] = useState("");
  const [images, setImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const handleLikePost = async (postId) => {
    try {
      setLikePost(!likePost);
      setLikes(likes + (likePost ? -1 : 1));
      await instance.post("/likePost", { postId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (postId, comment, userId, type = "text") => {
    try {
      await instance.post("/addComment", { postId, comment, userId, type });
      setComment("");
      setAudioBlob(null); // Clear after sending
    } catch (error) {
      console.log(error);
    }
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      setIsRecording(true);
      console.log("comment recording is start");
      toast("comment recording is start");

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        setIsRecording(false);
        console.log("recording is stop");
        toast("comment recording is stop");
      };
      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // Stop after 5 seconds for demo
    });
  };

  const handleVoiceComment = async () => {
    if (!audioBlob) return;
    const formData = new FormData();
    formData.append("comment", audioBlob);
    formData.append("postId", post.postId);
    formData.append("userId", userId);
    formData.append("type", "voice");

    await instance.post("/addComment", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setAudioBlob(null);
  };

  const handleChanges = async () => {
    try {
      const response = await instance.get(`/getPostById?postId=${post.postId}`);
      const { likes, comments } = response.data.posts[0];
      setComments([...comments]);
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

  const fetchData = async () => {
    setImages(post.post);
    await getUser();
    await handleChanges();
    setLikePost(post.likes.some((follower) => follower.userId === userId));
  };

  useEffect(() => {
    fetchData();
  }, [comment, post, userId, post.likes, post.comments, audioBlob]);

  return (
    post.postId && (
      <section
        className="flex flex-col justify-between w-full md:w-[500px] lg:w-[800px] bg-black rounded-xl relative"
        key={post.postId}
      >
        <div className="flex justify-between p-3 cursor-pointer items-center">
          <div
            className="flex gap-2 items-center"
            onClick={() => navigate(`/profile/${post.username}`)}
          >
            <img
              src={
                post.profile_img?.includes("googleusercontent")
                  ? post.profile_img
                  : `${SERVER_URL}/${post.profile_img}`
              }
              className="w-10 h-10 rounded-full"
            />
            {post.username}
          </div>
          {post.token === localStorage.getItem("token") && (
            <Settings onClick={() => navigate(`/EditPost/${post.postId}`)} />
          )}
        </div>
        <Slider images={images} />
        <p className="text-left p-3">{post.caption}</p>
        <div className="flex gap-3 p-3 items-center">
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
            <div className="flex flex-col gap-2 px-3 overflow-y-scroll">
              <h3 className="font-bold">Comments</h3>
              {comments.length > 0 ? (
                comments.map((item, index) => (
                  <div key={index}>
                    {item.type === "text" ? (
                      <p>{item.comment}</p>
                    ) : (
                      <audio controls src={`${SERVER_URL}/${item.comment}`} />
                    )}
                  </div>
                ))
              ) : (
                <p>No comments found</p>
              )}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Add Comment"
                className="w-full rounded-full p-4 bg-black outline-none"
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
              <button
                className="rounded-full p-4 outline-none flex gap-2"
                onClick={startRecording}
                disabled={isRecording}
              >
                <Mic />
              </button>
              <button
                className="rounded-full p-4 outline-none flex gap-2"
                onClick={handleVoiceComment}
                disabled={!audioBlob}
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
