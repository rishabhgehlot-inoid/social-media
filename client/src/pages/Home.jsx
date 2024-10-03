import axios from "axios";
import { Heart, Menu, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  EmailShareButton,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
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
  const handleLikePost = async (postId) => {
    try {
      await instance.post("/likePost", { postId: postId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full bg-gray-950 text-white">
      <main className=" flex justify-start flex-col items-center p-4 gap-4">
        {posts.length > 0 &&
          posts.map((item) => {
            return (
              <section
                className=" flex flex-col justify-between w-full  md:w-[500px] lg:w-[800px] bg-black rounded-xl"
                key={item.postId}
              >
                <button
                  className=" flex justify-between p-3 cursor-pointer items-center"
                  onClick={() => {
                    navigation(`/profile/${item.username}`);
                  }}
                >
                  <div className=" flex gap-2 items-center">
                    <img
                      src={`http://localhost:4010/${item.profile_img}`}
                      className=" w-10 h-10 rounded-full"
                    />
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
                <div className=" flex gap-3 p-3 items-center">
                  <Heart
                    onClick={() => {
                      handleLikePost(item.postId);
                    }}
                  />
                  <div>{item.likes}</div>
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
              </section>
            );
          })}
      </main>
    </div>
  );
};

export default Home;
