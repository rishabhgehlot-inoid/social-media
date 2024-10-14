import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../config/instance";

const Login = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState({
    phone_number: "",
    password: "",
  });

  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const response = await instance.post("/LoginUsingGoogle", {
        email: googleUser.email,
        password: googleUser.uid,
      });
      console.log("token", response.data.token);

      localStorage.setItem("token", response.data.token);
      navigation("/");
      toast.success("Logged in successfully with Google!");
    } catch (error) {
      const errorMessage = error.message || "Google login failed!";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const validateInputs = () => {
    if (!user.phone_number || !user.password) {
      toast.error("Phone number and password are required!");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      const result = await instance.post("/LoginUser", user);
      console.log(result.data);
      localStorage.setItem("token", result.data.token);
      setUser({
        phone_number: "",
        password: "",
      });
      navigation("/");
      toast.success("Logged in successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed!";
      toast.error(errorMessage);
      console.error(error);
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
    <div className="text-white flex justify-center items-center w-screen h-screen bg-gray-950 p-3">
      <main className="flex flex-col gap-3 bg-black p-5 rounded-2xl w-full md:w-[500px]">
        <h1 className="text-5xl font-bold text-center py-9">Login</h1>
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
        <Link to={"/register"} className="text-center">
          Don&apos;t have an account? Register
        </Link>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Login;
