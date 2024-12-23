import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { X } from "lucide-react";
import { instance, SERVER_URL } from "../config/instance";
const Profile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [story, setStory] = useState(null);
  const [addStory, setAddStory] = useState(false);
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
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const handleStroy = async () => {
    try {
      if (story) {
        const formData = new FormData();
        formData.append("story", story);
        const response = await instance.post("/addStory", formData, config);
        console.log(response.data);
        setAddStory(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className=" w-full bg-gray-900 text-white h-screen pb-48 animate-fadeIn">
      {addStory && (
        <main className=" w-full h-full bg-black/80 z-[100] absolute left-0 top-0">
          <div className=" w-full md:w-fit absolute bg-black left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-4 p-5 rounded-xl z-[100] m-2">
            <X
              className=" absolute right-3 top-3"
              onClick={() => {
                setAddStory(false);
                setStory();
              }}
            />
            {story ? (
              <img src={URL.createObjectURL(story)} className=" md:h-[500px]" />
            ) : (
              <div className="parent">
                <div className="file-upload">
                  <h3>Click box to upload</h3>
                  <p>Maximun file size 10mb</p>
                  <input
                    type="file"
                    name="post"
                    onChange={(e) => setStory(e.target.files[0])}
                  />
                </div>
              </div>
            )}
            <button
              className=" p-2 bg-orange-600 rounded-lg w-full"
              onClick={handleStroy}
            >
              Upload
            </button>
          </div>
        </main>
      )}
      <aside
        className={`flex items-center w-full h-auto bg-gray-800   ${
          isScrolling
            ? " p-2 duration-300 gap-2"
            : "md:p-16 duration-300 p-8 gap-10"
        }`}
      >
        <div className="" onClick={() => setAddStory(true)}>
          {posts.length > 0 && posts[0].profile_img ? (
            <img
              src={
                posts[0].profile_img.includes("googleusercontent")
                  ? posts[0].profile_img // Google profile image URL
                  : `${SERVER_URL}/${posts[0].profile_img}` // Local image URL
              }
              className={` rounded-full ${
                isScrolling
                  ? "md:w-20 md:h-20 duration-300 w-10 h-10"
                  : "md:w-40 md:h-40 duration-300 w-20 h-20"
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
            <button className="px-4 py-2 bg-gray-950 rounded-xl w-full">
              View
            </button>
            {posts[0]?.token === localStorage.getItem("token") && (
              <button
                className=" px-4 py-2 bg-gray-950 rounded-xl w-full"
                onClick={() => {
                  navigation(`/editProfile/${posts[0].userId}`);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </aside>
      <main
        className=" flex flex-col items-center h-full p-4 gap-4 overflow-y-scroll pb-20"
        ref={mainRef}
      >
        {posts.map((item) => {
          console.log(item);

          return <Post post={item} key={posts.id} />;
        })}
      </main>
    </div>
  );
};

export default Profile;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiRnJpIE9jdCAwNCAyMDI0IDE5OjE2OjE1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInBob25lX251bWJlciI6Iis5MTczMDAwNTQyODUiLCJpYXQiOjE3MjgwNDk1NzV9.izvQ8JevVCZgWjBtzHK3XgekGq1KDwd1f7CL4oyTdAQ
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiRnJpIE9jdCAwNCAyMDI0IDE5OjE2OjE1IEdNVCswNTMwIChJbmR
