import { Home, PlusSquare, Search, Share, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className=" w-[500px] bg-gray-950 h-screen p-5 flex flex-col justify-between pb-20 hidden md:block">
      <ul className=" w-full">
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-5 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <Home /> Feed
        </NavLink>
        <NavLink
          to={"/search"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-5 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <Search />
          Search
        </NavLink>
        <NavLink
          to={"/add-post"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-5 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <PlusSquare />
          Add Post
        </NavLink>

        <NavLink
          to={"/profile"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-5 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <User />
          Profile
        </NavLink>
        <NavLink
          to={"/chat"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-5 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <Share /> Messages
        </NavLink>
      </ul>
    </div>
  );
};

export default SideBar;
