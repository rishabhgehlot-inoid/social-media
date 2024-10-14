import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../config/instance";

const SignUp = () => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState({
    username: "",
    phone_number: "",
    password: "",
  });

  const navigation = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const response = await instance.post("/RegisterUsingGoogle", {
        username: googleUser.displayName.trim(),
        email: googleUser.email,
        password: googleUser.uid,
        profile_img: googleUser.photoURL,
      });
      localStorage.setItem("token", response.data.token);
      navigation("/");
      setUser({
        username: "",
        phone_number: "",
        password: "",
      });
      toast.success("Registered successfully with Google!");
    } catch (error) {
      const errorMessage = error.message || "Google login failed!";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const validateInputs = () => {
    if (!user.username || !user.phone_number || !user.password) {
      toast.error("All fields are required!");
      return false;
    }
    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      const result = await instance.post("/RegisterUser", user);
      console.log(result.data);
      localStorage.setItem("token", result.data.token);
      setUser({
        username: "",
        phone_number: "",
        password: "",
      });
      navigation("/");
      toast.success("Registered successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Registration failed!";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="text-white flex justify-center items-center w-screen h-screen bg-gray-950 p-3">
      <main className="flex flex-col gap-3 bg-black p-5 rounded-2xl w-full md:w-[500px]">
        <h1 className="text-5xl font-bold text-center py-9">Register</h1>
        <input
          type="text"
          name="username"
          className="p-3 rounded-2xl bg-gray-950 outline-none "
          placeholder="Username..."
          value={user.username}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone_number"
          className="p-3 rounded-2xl bg-gray-950 outline-none "
          placeholder="Phone Number..."
          value={user.phone_number}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="p-3 rounded-2xl bg-gray-950 outline-none "
          placeholder="Password..."
          onChange={handleInputChange}
          name="password"
          value={user.password}
        />
        <button
          className="p-3 rounded-2xl bg-orange-600 font-bold  hover:bg-orange-800"
          onClick={handleRegister}
        >
          Submit
        </button>
        <button
          className="p-3 rounded-2xl bg-orange-600 font-bold  hover:bg-orange-800"
          onClick={handleGoogleLogin}
        >
          Google
        </button>
        <Link to={"/login"} className="text-center">
          Account exists? Login Account
        </Link>
      </main>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
