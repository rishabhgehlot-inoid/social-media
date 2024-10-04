import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
const Profile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const handlePost = async () => {
    try {
      if (username) {
        const response = await instance.get(
          `/getUserByUsername?username=${username}`
        );
        console.log(response.data, "this is instance");
        setPosts(response.data);
      } else {
        const response = await instance.get("/getUserWithPosts");
        console.log(response.data, "this is instance");
        setPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlePost();
  }, [username]);
  const navigation = useNavigate();
  return (
    <div className=" w-full bg-gray-950 text-white min-h-screen">
      <aside className=" flex w-full h-auto p-8 md:p-16 bg-black gap-10">
        <div className="">
          {posts.length > 0 && posts[0].profile_img ? (
            <img
              src={`http://localhost:4010/${posts[0].profile_img}`}
              className=" w-20 h-20 md:w-40 md:h-40 rounded-full"
            />
          ) : (
            ""
          )}
        </div>
        <div className=" flex gap-4 flex-col">
          <h2 className=" text-xl">{posts.length > 0 && posts[0].username}</h2>
          <div className=" flex gap-4">
            <button className=" md:px-4 md:py-2 bg-gray-950 rounded-xl w-full">
              View
            </button>
            <button
              className=" md:px-4 md:py-2 bg-gray-950 rounded-xl w-full"
              onClick={() => {
                navigation(`/editProfile/${posts[0].userId}`);
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </aside>
      <main className=" flex justify-center items-center p-4 gap-4 flex-wrap p-4">
        {posts.length > 0 &&
          posts.map((item) => {
            return <Post post={item} key={posts.postId} />;
          })}
      </main>
    </div>
  );
};

export default Profile;
