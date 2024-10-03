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
const { CreatePost, getPosts } = require("../models/Post");
const jwt = require("jsonwebtoken");
const fs = require("fs");
let randomstring = require("randomstring");
module.exports.CreatePost = async (req, res) => {
  const { caption } = req.body;
  const path = `${Date.now()}.png`;
  const token = req.headers["token"];
  console.log(req, "file");

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const phone_number = decodedToken.phone_number;
  const result = await FindUserByPhoneNumber(phone_number);
  const userId = result[0].userId;
  console.log(userId);
  fs.writeFile(`public/${path}`, req.file.buffer, (err) => {
    if (err) throw err;
  });

  const postId = randomstring.generate();
  try {
    await CreatePost(userId, caption, path, postId);
    res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getPostsController = async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
