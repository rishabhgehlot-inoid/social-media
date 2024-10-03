import axios from "axios";
import { Heart, Menu, MessageCircle, Share2, UserCircle } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

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
    <div className=" w-full bg-gray-950 text-white">
      <main className=" flex justify-start flex-col items-center p-4 gap-4">
        {posts.length > 0 &&
          posts.map((item) => {
            return (
              <section
                className=" flex flex-col justify-between w-full  md:w-[500px] bg-black rounded-xl"
                key={item.userId}
              >
                <button
                  className=" flex justify-between p-3 cursor-pointer"
                  onClick={() => {
                    navigation(`/profile/${item.username}`);
                  }}
                >
                  <div className=" flex gap-2">
                    <UserCircle color="white" />
                    {item.username}
                  </div>
                  <Menu />
                </button>
                <img
                  src={`http://localhost:4010/${item.post}`}
                  alt={item.post}
                  className=""
                />
                <caption className=" text-left p-3">{item.caption}</caption>
                <div className=" flex gap-3 p-3">
                  <Heart />
                  <MessageCircle />
                  <Share2 />
                </div>
              </section>
            );
          })}
      </main>
    </div>
  );
};

export default Home;
