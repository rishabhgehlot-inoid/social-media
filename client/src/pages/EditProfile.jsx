import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error("Failed to fetch user details.");
      console.log(error);
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  const validateInputs = () => {
    if (!user.username.trim()) {
      toast.error("Username cannot be empty!");
      return false;
    }
    if (!user.phone_number.trim()) {
      toast.error("Phone number cannot be empty!");
      return false;
    }
    if (!user.email.trim() || !/\S+@\S+\.\S+/.test(user.email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    // if (!user.password.trim() || user.password.length < 6) {
    //   toast.error("Password must be at least 6 characters long!");
    //   return false;
    // }
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validateInputs()) return; // Validate inputs before proceeding

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("username", user.username);
      formData.append("phone_number", user.phone_number);
      formData.append("password", user.password);
      formData.append("email", user.email);
      formData.append("profile_img", user.profile_img);

      const response = await instance.post("/updateProfile", formData, config);
      toast.success("Profile updated successfully!");
      console.log(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to update profile!";
      toast.error(errorMessage);
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
    <div className="w-full bg-gray-800 text-white min-h-screen">
      <main className="flex justify-start flex-col items-center p-4 gap-4">
        <div className="container max-w-2xl flex flex-col gap-3 w-full">
          <input
            className="w-full p-4 bg-black rounded-full"
            placeholder="Username...."
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          <input
            className="w-full p-4 bg-black rounded-full"
            placeholder="Phone Number...."
            name="phone_number"
            value={user.phone_number}
            onChange={handleInputChange}
          />
          <input
            className="w-full p-4 bg-black rounded-full"
            placeholder="Email...."
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <input
            className="w-full p-4 bg-black rounded-full"
            placeholder="Profile Pic...."
            type="file"
            name="profile_img"
            onChange={(event) =>
              setUser({ ...user, profile_img: event.target.files[0] })
            }
          />
          <input
            className="w-full p-4 bg-black rounded-full"
            placeholder="Password...."
            name="password"
            onChange={handleInputChange}
            type="password" // Ensure password is masked
          />
          <button
            className="w-full p-4 bg-orange-600 rounded-full"
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
