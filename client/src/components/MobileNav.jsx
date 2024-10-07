import { Home, PlusSquare, Search, Send, User, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <div className=" w-screen bg-gray-950 p-2 flex  sticky bottom-0 left-0 md:hidden">
      <ul className=" w-full flex justify-evenly">
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-2 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <Home />
        </NavLink>
        <NavLink
          to={"/friends"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-2 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <Users />
        </NavLink>
        <NavLink
          to={"/search"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-2 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <Search />
        </NavLink>
        <NavLink
          to={"/add-post"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-2 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <PlusSquare />
        </NavLink>

        <NavLink
          to={"/profile"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-2 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <User />
        </NavLink>
        <NavLink
          to={"/chat"}
          className={({ isActive, isPending }) =>
            `text-xl font-bold text-white shadow-sm p-2 flex gap-4 rounded-lg ${
              isPending ? "pending" : isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <Send />
        </NavLink>
      </ul>
    </div>
  );
};

export default MobileNav;
