import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    username: "",
    phone_number: "",
    password: "",
    email: "",
    profile_img: null,
  });
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      "content-type": "multipart/form-data",
      token: localStorage.getItem("token"),
    },
  });
  const handleUser = async () => {
    try {
      const response = await instance.get("/getUser");
      setUser({
        username: response.data[0].username,
        email: response.data[0].email,
        phone_number: response.data[0].phone_number,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("username", user.username);
      formData.append("phone_number", user.phone_number);
      formData.append("password", user.password);
      formData.append("email", user.email);
      formData.append("profile_img", user.profile_img);
      const response = await instance.post("/updateProfile", formData, config);
      console.log(response.data);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, // Spread the previous state to maintain other values
      [name]: value, // Update the specific input field
    });
  };
  return (
    <div className=" w-full bg-gray-800 text-white min-h-screen">
      <main className=" flex justify-start flex-col items-center p-4 gap-4">
        <div className=" container max-w-2xl flex flex-col gap-3 w-full">
          <input
            className=" w-full p-4 bg-black rounded-full"
            placeholder="Username...."
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          <input
            className=" w-full p-4 bg-black rounded-full"
            placeholder="Phone Number...."
            name="phone_number"
            value={user.phone_number}
            onChange={handleInputChange}
          />
          <input
            className=" w-full p-4 bg-black rounded-full"
            placeholder="Email...."
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <input
            className=" w-full p-4 bg-black rounded-full"
            placeholder="Profile Pic...."
            type="file"
            name="profile_img"
            onChange={(event) =>
              setUser({ ...user, profile_img: event.target.files[0] })
            }
          />
          <input
            className=" w-full p-4 bg-black rounded-full"
            placeholder="Password...."
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <button
            className="w-full p-4 bg-orange-600 rounded-full"
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
