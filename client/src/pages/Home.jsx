import { useState } from "react";
import { useEffect } from "react";

import Post from "../components/Post";
import StroyBlock from "../components/StroyBlock";
import { instance } from "../config/instance";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const handlePost = async () => {
    try {
      const response = await instance.get(`fetchPost?page=${pageNumber}`);
      setPosts([...posts, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlePost();
  }, [pageNumber, setPageNumber]);
  const handleScroll = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      console.log("calling...");

      setLoading(true);
      setPageNumber(pageNumber + 1);
    }
  };
  return (
    <div className=" w-full bg-gray-900 text-white animate-fadeIn overflow-y-scroll pb-40 h-screen">
      <StroyBlock />
      <main
        className=" flex justify-start flex-col items-center p-4 gap-4"
        onScroll={handleScroll}
      >
        {posts.length > 0 ? (
          posts.map((item) => {
            return <Post post={item} key={item.postId} />;
          })
        ) : (
          <>No Posts Found</>
        )}
      </main>
      {loading ? <div className=" text-white">Loading...</div> : <></>}
    </div>
  );
};

export default Home;
