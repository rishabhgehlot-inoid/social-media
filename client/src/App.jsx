/* eslint-disable no-undef */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import EditProfile from "./pages/EditProfile";
import EditPost from "./pages/EditPost";
import SideBar from "./components/SideBar";
import UserSideBar from "./components/UserSideBar";
import MobileNav from "./components/MobileNav";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return localStorage.getItem("token") ? (
    <main className="h-screen fixed w-screen bg-gray-900">
      <Header />
      <div className="flex">
        <SideBar />
        {children}
        <UserSideBar />
      </div>
      <MobileNav />
      <Footer />
    </main>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
const handleAuthRedirect = (component) => {
  return localStorage.getItem("token") ? (
    <Navigate to="/" replace={true} />
  ) : (
    component
  );
};
const handleChatRedirect = (component) => {
  return !localStorage.getItem("token") ? (
    <Navigate to="/login" replace={true} />
  ) : (
    component
  );
};

const App = () => {
  const protectedRoutes = [
    { path: "/", element: <Home /> },
    { path: "/friends", element: <Friends /> },
    { path: "/profile", element: <Profile /> },
    { path: "/profile/:username", element: <Profile /> },
    { path: "/editProfile/:userId", element: <EditProfile /> },
    { path: "/search", element: <Search /> },
    { path: "/add-post", element: <AddPost /> },
    { path: "/EditPost/:id", element: <EditPost /> },
  ];

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Layout>{route.element}</Layout>}
            />
          ))}
          <Route path="/chat" element={handleChatRedirect(<ChatLayout />)} />
          <Route path="/register" element={handleAuthRedirect(<SignUp />)} />
          <Route path="/login" element={handleAuthRedirect(<Login />)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const ChatLayout = () => {
  return (
    <div className="bg-gray-900">
      <Header />
      <Chat />
      <MobileNav />
    </div>
  );
};

export default App;
