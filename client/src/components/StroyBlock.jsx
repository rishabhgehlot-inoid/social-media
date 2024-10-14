import { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import { instance, SERVER_URL } from "../config/instance";

const StroyBlock = () => {
  const [users, setUsers] = useState([]);
  const [activeUserIndex, setActiveUserIndex] = useState(null);

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
    setActiveUserIndex(index);
  };

  const handleStoryClose = () => {
    setActiveUserIndex(null);
  };

  return (
    <div className="">
      <main
        className={`w-full bg-gray-800 text-white flex justify-start overflow-x-scroll`}
      >
        {users.length > 0 &&
          users.map(
            (item, index) =>
              JSON.parse(item.stories).length > 0 && (
                <div
                  className={`md:p-4 p-2`}
                  key={item.userId}
                  onClick={() => handleStoryOpen(index)}
                >
                  <div className="flex gap-3 items-center">
                    <div className=" rounded-full">
                      {item.profile_img ? (
                        <img
                          src={
                            item.profile_img.includes("googleusercontent")
                              ? item.profile_img
                              : `${SERVER_URL}/${item.profile_img}`
                          }
                          className="md:w-20 md:h-20 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              )
          )}
      </main>

      {activeUserIndex !== null && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black/90 z-[100] flex justify-center items-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={handleStoryClose}
          >
            Close
          </button>
          <Stories
            stories={
              users[activeUserIndex]?.stories.length > 0
                ? JSON.parse(users[activeUserIndex].stories).map((story) => ({
                    url: `${SERVER_URL}/${story.story_img}`,
                  }))
                : [{ url: "" }]
            }
            defaultInterval={1500}
            onAllStoriesEnd={handleStoryClose} // Close stories when they end
          />
        </div>
      )}
    </div>
  );
};

export default StroyBlock;
