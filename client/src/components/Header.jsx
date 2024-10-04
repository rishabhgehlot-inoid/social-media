import {
  Home,
  LogOut,
  MessageCircleMore,
  PlusSquare,
  Search,
  User,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigation = useNavigate();
  return (
    <div className=" w-full bg-black p-5 h-18 sticky top-0 z-50">
      <main className=" flex justify-between items-center gap-5">
        <h1
          className=" text-2xl font-bold text-white cursor-pointer"
          onClick={() => {
            navigation("/");
          }}
        >
          Socials
        </h1>
        <ul className=" pt-1 flex gap-3 font-bold text-white items-center">
          <Home
            className=" hover:text-orange-600"
            onClick={() => {
              navigation("/");
            }}
          />
          <Users
            className=" hover:text-orange-600"
            onClick={() => {
              navigation("/friends");
            }}
          />
          <User
            className=" hover:text-orange-600"
            onClick={() => {
              navigation("/profile");
            }}
          />
          <Search
            className=" hover:text-orange-600"
            onClick={() => {
              navigation("/search");
            }}
          />
          <PlusSquare
            className=" hover:text-orange-600"
            onClick={() => {
              navigation("/add-post");
            }}
          />
          <MessageCircleMore
            className=" hover:text-orange-600"
            onClick={() => {
              navigation("/chat");
            }}
          />
          <LogOut
            onClick={() => {
              navigation("/login");
            }}
            className=" hover:text-orange-600"
          />
        </ul>
      </main>
    </div>
  );
};

export default Header;
