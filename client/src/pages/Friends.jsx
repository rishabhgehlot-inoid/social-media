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

  const handleFollow = async (followerId) => {
    try {
      const response = await instance.post("/follow", {
        followerId,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full bg-gray-900 text-white h-screen animate-fadeIn">
      <main className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center p-4 gap-4">
        {posts.map((item) => {
          return (
            <section
              className=" flex flex-col justify-center w-full bg-black rounded-xl items-center aspect-square gap-3 max-w-72 p-3"
              key={item.userId}
            >
              <div className=" w-24 h-24 rounded-full bg-white">
                {item.profile_img ? (
                  <img
                    src={
                      item.profile_img.includes("googleusercontent")
                        ? item.profile_img // Google profile image URL
                        : `http://localhost:4010/${item.profile_img}` // Local image URL
                    }
                    className=" w-24 h-24 rounded-full"
                  />
                ) : (
                  ""
                )}
              </div>
              <h2>{item.username}</h2>
              <div className=" w-full flex gap-1 md:gap-2 md:px-3">
                <button
                  className=" md:px-4 py-2 bg-gray-950 rounded-xl w-full"
                  onClick={() => {
                    navigation(`/profile/${item.username}`);
                  }}
                >
                  View
                </button>
                <button
                  className=" md:px-4 py-2 bg-gray-950 rounded-xl w-full"
                  onClick={() => handleFollow(item?.userId)}
                >
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
