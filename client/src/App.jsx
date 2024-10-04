import { BrowserRouter, Route, Routes } from "react-router-dom";
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
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <div className=" flex">
                  <SideBar />
                  <Home />
                  <UserSideBar />
                </div>
              </Layout>
            }
          />
          <Route
            path="/friends"
            element={
              <Layout>
                <Friends />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/editProfile/:userId"
            element={
              <Layout>
                <EditProfile />
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <Search />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout>
                <Chat />
              </Layout>
            }
          />
          <Route
            path="/add-post"
            element={
              <Layout>
                <AddPost />
              </Layout>
            }
          />
          <Route
            path="/EditPost/:id"
            element={
              <Layout>
                <EditPost />
              </Layout>
            }
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
