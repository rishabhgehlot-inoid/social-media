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
const {
  getUser,
  getAllUsers,
  getUserByUsername,
  UpdateUser,
} = require("../models/User");
const { P } = require("pino");

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
  const email = decodedToken.email;
  try {
    const result = await getUserWithPosts(phone_number, email);
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
module.exports.UpdateUserProfileController = async (req, res) => {
  const { username, phone_number, password, email, userId } = req.body;
  let path = "";
  console.log(password, "it is password");

  console.log(req.file, "file");
  console.log(
    { username, phone_number, password, email },
    "------------->body"
  );
  let hashedPassword = "";
  if (password != null && password != "" && password != "undefined") {
    console.log(password, "password is hashing ");
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }
  if (req.file) {
    path = `${Date.now()}.png`;
    fs.writeFile(`public/${path}`, req.file.buffer, (err) => {
      if (err) throw err;
    });
  }

  try {
    await UpdateUser(
      userId,
      username,
      phone_number,
      hashedPassword,
      email,
      path
    );
    res.status(201).json({ message: "Profile is Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "some error" });
  }
};
