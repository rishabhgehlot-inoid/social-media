import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const handlePost = async () => {
    try {
      const response = await instance.get(`/getAllUsers?search=${searchQuery}`);
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handlePost();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div className=" w-full bg-gray-900 text-white p-4 h-screen animate-fadeIn">
      <input
        type="text"
        className=" p-3 rounded-2xl w-full bg-black outline-none"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
                    src={`http://localhost:4010/${item.profile_img}`}
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
                <button className=" md:px-4 py-2 bg-gray-950 rounded-xl w-full">
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

export default Search;
