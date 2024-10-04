import axios from "axios";
import { useEffect, useState } from "react";

const UserSideBar = () => {
  const [users, setUsers] = useState([]);
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token"),
    },
  });
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
    <div>
      <main
        className={` md:w-[500px] w-full bg-black/45 text-white h-full overflow-y-scroll fixed right-0`}
      >
        {users.length > 0 &&
          users.map((item) => {
            return (
              <div
                className={`w-full shadow-2xl flex gap-3 items-center justify-between p-4 `}
                key={item.userId}
              >
                <div className=" flex gap-3 items-center">
                  <div className=" w-20 h-20 bg-white rounded-full">
                    {item.profile_img ? (
                      <img
                        src={`http://localhost:4010/${item.profile_img}`}
                        className=" w-20 h-20 rounded-full"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <h1 className="  font-bold text-xl">{item.username}</h1>
                </div>
                <button className=" p-3 rounded-lg bg-gray-900">View Profile</button>
              </div>
            );
          })}
      </main>
    </div>
  );
};

export default UserSideBar;
