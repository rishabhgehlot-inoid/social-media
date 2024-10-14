import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance, SERVER_URL } from "../config/instance";

const UserSideBar = () => {
  const navigation = useNavigate();
  const [users, setUsers] = useState([]);

  const handleUsers = async () => {
    try {
      const response = await instance.get("/getAllUsers");
      console.log(response.data);
      setUsers(response.data);
      // setReceiver(response.data[0].userId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUsers();
  }, []);
  return (
    <div className=" hidden md:block">
      <main
        className={` md:w-[500px] w-full bg-gray-950 text-white h-full overflow-y-scroll right-0`}
      >
        {users.length > 0 &&
          users.map((item) => {
            return (
              item.token != localStorage.getItem("token") && (
                <div
                  className={`w-full shadow-2xl flex gap-3 items-center justify-between p-4 `}
                  key={item.userId}
                >
                  <div className=" flex gap-3 items-center">
                    <div className=" w-20 h-20 bg-white rounded-full">
                      {item.profile_img ? (
                        <img
                          src={
                            item.profile_img.includes("googleusercontent")
                              ? item.profile_img
                              : `${SERVER_URL}/${item.profile_img}`
                          }
                          className=" w-20 h-20 rounded-full"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <h1 className="  font-bold text-xl">{item.username}</h1>
                  </div>
                  <button
                    className=" p-3 rounded-lg bg-gray-900"
                    onClick={() => {
                      navigation(`/profile/${item.username}`);
                    }}
                  >
                    View Profile
                  </button>
                </div>
              )
            );
          })}
      </main>
    </div>
  );
};

export default UserSideBar;
