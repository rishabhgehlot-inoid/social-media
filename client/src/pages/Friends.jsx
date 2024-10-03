import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigate();
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const handlePost = async () => {
    try {
      const response = await instance.get("/getAllUsers");
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
    <div className=" w-full bg-gray-950 text-white h-screen">
      <main className=" flex justify-start flex-row items-center p-4 gap-4">
        {posts.map((item) => {
          return (
            <section
              className=" flex flex-col justify-center w-full  md:w-[500px] bg-black rounded-xl items-center aspect-square gap-3 max-w-72"
              key={item.userId}
            >
              <div className=" w-24 h-24 rounded-full bg-white"></div>
              <h2>{item.username}</h2>
              <div className=" w-full flex gap-2 px-3">
                <button
                  className=" px-4 py-2 bg-gray-950 rounded-xl w-full"
                  onClick={() => {
                    navigation(`/profile/${item.username}`);
                  }}
                >
                  View
                </button>
                <button className=" px-4 py-2 bg-gray-950 rounded-xl w-full">
                  Follow
                </button>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Friends;
