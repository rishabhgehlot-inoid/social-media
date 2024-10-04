import {
  Home,
  LogOut,
  PlusSquare,
  Search,
  Share,
  User,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className=" fixed w-[500px] bg-black/55 h-screen p-5 flex flex-col justify-between pb-20">
      <ul className=" w-full">
        <NavLink
          to={"/"}
          className=" text-xl font-bold text-white shadow-sm p-5 flex gap-4 bg-orange-700 rounded-lg"
          
        >
          <Home /> Feed
        </NavLink>
        <NavLink
          to={"/friends"}
          className=" text-xl font-bold text-white shadow-sm p-5 flex gap-4"
        >
          <Users />
          Friends
        </NavLink>
        <NavLink
          to={"/search"}
          className=" text-xl font-bold text-white shadow-sm p-5 flex gap-4"
        >
          <Search />
          Search
        </NavLink>
        <NavLink
          to={"/add-post"}
          className=" text-xl font-bold text-white shadow-sm p-5 flex gap-4"
        >
          <PlusSquare />
          Add Post
        </NavLink>

        <NavLink
          to={"/profile"}
          className=" text-xl font-bold text-white shadow-sm p-5 flex gap-4"
        >
          <User />
          Profile
        </NavLink>
        <NavLink
          to={"/chat"}
          className=" text-xl font-bold text-white shadow-sm p-5 flex gap-4"
        >
          <Share /> Messages
        </NavLink>
      </ul>
      <NavLink
        to={"/login"}
        className=" text-xl font-bold text-white shadow-sm p-5 flex gap-4"
      >
        <LogOut />
        Logout
      </NavLink>
    </div>
  );
};

export default SideBar;
