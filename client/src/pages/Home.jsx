import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import Post from "../components/Post";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const handlePost = async () => {
    try {
      const response = await instance.get("/posts");
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlePost();
  }, []);

  return (
    <div className=" w-full bg-gray-900 text-white animate-fadeIn">
      <main className=" flex justify-start flex-col items-center p-4 gap-4 overflow-y-scroll h-screen">
        {posts.length > 0 &&
          posts.map((item) => {
            return <Post post={item} key={item.postId} />;
          })}
      </main>
    </div>
  );
};

export default Home;
