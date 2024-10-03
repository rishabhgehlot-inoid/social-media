const {
  SERVER_CREATED_HTTP_CODE,
  SERVER_BAD_REQUEST,
} = require("../config/constants");
const {
  CreateUserTable,
  RegisterUser,
  UserIsExistOrNot,
  UserLogin,
  UserIsExistOrNotForLogin,
  FindUserByPhoneNumber,
} = require("../models/Auth");
const bcrypt = require("bcryptjs");
const { generateJWTToken } = require("../services/jwtService");
const { CreatePost, getPosts, getUserWithPosts } = require("../models/Post");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { getUser, getAllUsers, getUserByUsername } = require("../models/User");

module.exports.getUser = async (req, res) => {
  const token = req.headers["token"];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const phone_number = decodedToken.phone_number;
  try {
    const result = await getUser(phone_number);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getUserWithPosts = async (req, res) => {
  const token = req.headers["token"];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const phone_number = decodedToken.phone_number;
  try {
    const result = await getUserWithPosts(phone_number);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAllUsersController = async (req, res) => {
  let search = req.query.search;
  try {
    const result = await getAllUsers(search);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getUserByUsername = async (req, res) => {
  let username = req.query.username;
  try {
    const result = await getUserByUsername(username);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
