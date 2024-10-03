const express = require("express");
const {
  CreateTable,
  RegisterUserController,
  LoginController,
} = require("../controllers/Auth");
const { CreatePost, getPostsController } = require("../controllers/Post");
const { upload } = require("../config/multerConfig");
const { getPosts } = require("../models/Post");
const {
  getUser,
  getAllUsersController,
  getUserWithPosts,
  getUserByUsername,
} = require("../controllers/User");
const { getAllUsers } = require("../models/User");
const { AddChat, fetchChats } = require("../controllers/Chat");
const router = express.Router();

router.post("/createUserTable", CreateTable);
router.post("/RegisterUser", RegisterUserController);
router.post("/LoginUser", LoginController);

router.post("/createPost", upload.single("post"), CreatePost);
router.get("/posts", getPostsController);
router.get("/getUser", getUser);
router.get("/getUserWithPosts", getUserWithPosts);
router.get("/getAllUsers", getAllUsersController);
router.get("/getUserByUsername", getUserByUsername);

router.post("/addChat", AddChat);
router.post("/fetchChats", fetchChats);

module.exports = router;
