import axios from "axios";

import { useRef, useState } from "react";
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
  const [isScrolling, setIsScrolling] = useState(false); // Track if scrolling has started
  const mainRef = useRef(null);
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

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current.scrollTop > 0) {
        setIsScrolling(true); // Scrolling has started
      } else {
        setIsScrolling(false); // No scrolling
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const navigation = useNavigate();
  return (
    <div className=" w-full bg-gray-900 text-white h-screen pb-40 animate-fadeIn">
      <aside
        className={`flex w-full h-auto bg-gray-800   ${
          isScrolling ? " p-2 duration-300 gap-5" : "md:p-16 duration-300 p-8 gap-10"
        }`}
      >
        <div className="">
          {posts.length > 0 && posts[0].profile_img ? (
            <img
              src={`http://localhost:4010/${posts[0].profile_img}`}
              className={` w-20 h-20 rounded-full ${
                isScrolling
                  ? "md:w-20 md:h-20  duration-300"
                  : "md:w-40 md:h-40 duration-300"
              }`}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className={`${
            isScrolling
              ? "flex gap-4 flex-row items-center"
              : "flex gap-4 flex-col  justify-center"
          }`}
        >
          <h2 className=" text-xl">{posts.length > 0 && posts[0].username}</h2>
          <div className=" flex w-full gap-4">
            <button className=" md:px-4 md:py-2 bg-gray-950 rounded-xl w-full">
              View
            </button>
            <button
              className=" md:px-4 md:py-2 bg-gray-950 rounded-xl w-full"
              onClick={() => {
                navigation(`/editProfile/${posts[0].userId}`);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </aside>
      <main
        className=" flex flex-col items-center h-full p-4 gap-4 overflow-y-scroll "
        ref={mainRef}
      >
        {posts.length > 0 &&
          posts.map((item) => {
            return <Post post={item} key={posts.postId} />;
          })}
      </main>
    </div>
  );
};

export default Profile;
