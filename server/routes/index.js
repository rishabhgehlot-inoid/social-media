const express = require("express");
const {
  CreateTable,
  RegisterUserController,
  LoginController,
} = require("../controllers/Auth");
const {
  CreatePost,
  getPostsController,
  setLikePost,
} = require("../controllers/Post");
const { upload } = require("../config/multerConfig");
const { getPosts } = require("../models/Post");
const {
  getUser,
  getAllUsersController,
  getUserWithPosts,
  getUserByUsername,
  UpdateUserProfileController,
} = require("../controllers/User");
const { getAllUsers } = require("../models/User");
const { AddChat, fetchChats } = require("../controllers/Chat");
const router = express.Router();

router.post("/createUserTable", CreateTable);
router.post("/RegisterUser", RegisterUserController);
router.post("/LoginUser", LoginController);

router.post("/createPost", upload.single("post"), CreatePost);
router.post(
  "/updateProfile",
  upload.single("profile_img"),
  UpdateUserProfileController
);
router.get("/posts", getPostsController);
router.get("/getUser", getUser);
router.get("/getUserWithPosts", getUserWithPosts);
router.get("/getAllUsers", getAllUsersController);
router.get("/getUserByUsername", getUserByUsername);
router.post("/likePost", setLikePost);

router.post("/addChat", AddChat);
router.post("/fetchChats", fetchChats);

module.exports = router;
