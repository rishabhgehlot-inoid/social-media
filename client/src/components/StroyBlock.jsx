import axios from "axios";
import { useEffect, useState } from "react";
import Stories from "react-insta-stories";

const StroyBlock = () => {
  const [users, setUsers] = useState([]);
  const [activeUserIndex, setActiveUserIndex] = useState(null); // Track which user's stories are active

  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  const handleUsers = async () => {
    try {
      const response = await instance.get("/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  const handleStoryOpen = (index) => {
    setActiveUserIndex(index); // Set the index of the user whose stories are to be displayed
  };

  const handleStoryClose = () => {
    setActiveUserIndex(null); // Close the stories when done
  };

  return (
    <div className="">
      <main className={`w-full bg-gray-800 text-white flex justify-start overflow-x-scroll`}>
        {users.length > 0 &&
          users.map((item, index) => (
            <div className={`p-4`} key={item.userId} onClick={() => handleStoryOpen(index)}>
              <div className="flex gap-3 items-center">
                <div className="w-20 h-20 bg-white rounded-full">
                  {item.profile_img ? (
                    <img
                      src={
                        item.profile_img.includes("googleusercontent")
                          ? item.profile_img
                          : `http://localhost:4010/${item.profile_img}`
                      }
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
      </main>

      {activeUserIndex !== null && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black/90 z-[100] flex justify-center items-center">
          <button className="absolute top-4 right-4 text-white" onClick={handleStoryClose}>
            Close
          </button>
          <Stories
            stories={
              users[activeUserIndex]?.stories.length > 0
                ? JSON.parse(users[activeUserIndex].stories).map((story) => ({
                    url: `http://localhost:4010/${story.story_img}`,
                  }))
                : []
            }
            defaultInterval={1500}
            // width={432}
            // height={768}
            // onStoryEnd={handleStoryClose} // Close stories when they end
          />
        </div>
      )}
    </div>
  );
};

export default StroyBlock;
