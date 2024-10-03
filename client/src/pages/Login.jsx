import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Login = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState({
    username: "",
    phone_number: "",
    password: "",
  });
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });
  const handleRegister = async () => {
    try {
      const result = await instance.post("/LoginUser", user);
      console.log(result.data);
      localStorage.setItem("token", result.data.token);
      setUser({
        phone_number: "",
        password: "",
      });
      navigation("/");
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
    <div className=" text-white flex justify-center items-center w-screen h-screen bg-gray-950">
      <main className=" flex flex-col gap-3 bg-black p-5 rounded-2xl min-w-[500px]">
        <h1 className=" text-5xl font-bold text-center py-9">Login</h1>

        <input
          type="text"
          name="phone_number"
          className=" p-3 rounded-2xl bg-gray-950 outline-none hover:scale-105"
          placeholder="Phone Number..."
          value={user.phone_number}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className=" p-3 rounded-2xl bg-gray-950 outline-none hover:scale-105"
          placeholder="Password..."
          onChange={handleInputChange}
          name="password"
          value={user.password}
        />
        <button
          className=" p-3 rounded-2xl bg-orange-600 font-bold hover:scale-105 hover:bg-orange-800"
          onClick={handleRegister}
        >
          Submit
        </button>
        <Link to={"/register"} className=" text-center">
          Account is exist? Login Account
        </Link>
      </main>
    </div>
  );
};

export default Login;
