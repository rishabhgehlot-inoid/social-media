const express = require("express");
const {
  CreateTable,
  RegisterUserController,
  LoginController,
  RegisterUserUsingGoogle,
  LoginControllerUsingGoogle,
} = require("../controllers/Auth");
const {
  CreatePost,
  getPostsController,
  setLikePost,
  AddCommentByPostController,
  getPostByIdController,
  UpdatePost,
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
router.post("/RegisterUsingGoogle", RegisterUserUsingGoogle);
router.post("/LoginUser", LoginController);
router.post("/LoginUsingGoogle", LoginControllerUsingGoogle);

router.post("/createPost", upload.single("post"), CreatePost);
router.post("/updatePost", upload.single("post"), UpdatePost);
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
router.post("/addComment", AddCommentByPostController);

router.post("/addChat", AddChat);
router.post("/fetchChats", fetchChats);
router.get("/getPostById", getPostByIdController);

module.exports = router;
