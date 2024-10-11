const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const {
  SERVER_CREATED_HTTP_CODE,
  SERVER_BAD_REQUEST,
  SERVER_INTERNAL_ERROR,
} = require("../config/constants");
const {
  getUser,
  getAllUsers,
  getUserByUsername,
  UpdateUser,
  AddStory,
  addFollower,
  checkFollowing,
} = require("../models/User");
const { getUserWithPosts } = require("../models/Post");
const randomstring = require("randomstring");

// Validation schemas
const getUserSchema = Joi.object({
  token: Joi.string().required(),
});

const updateUserProfileSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  phone_number: Joi.string().length(13).required(),
  password: Joi.string().min(6).allow(null, ""),
  email: Joi.string().email().required(),
  userId: Joi.string().required(),
  profile_img: Joi.string(),
});

const searchSchema = Joi.object({
  search: Joi.string().allow("").optional(),
});

const usernameQuerySchema = Joi.object({
  username: Joi.string().min(3).required(),
});

// Get user details
module.exports.getUser = async (req, res) => {
  const { error } = getUserSchema.validate({ token: req.headers["token"] });
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const token = req.headers["token"];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    const result = await getUser(userId);
    res.status(SERVER_CREATED_HTTP_CODE).json(result);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res
      .status(SERVER_INTERNAL_ERROR)
      .json({ error: "Failed to fetch user details." });
  }
};

// Get user with posts
module.exports.getUserWithPosts = async (req, res) => {
  const { error } = getUserSchema.validate({ token: req.headers["token"] });
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const token = req.headers["token"];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const phone_number = decodedToken.phone_number;
    const email = decodedToken.email;
    const result = await getUserWithPosts(phone_number, email);
    res.status(SERVER_CREATED_HTTP_CODE).json(result);
  } catch (error) {
    console.error("Error fetching user with posts:", error.message);
    res
      .status(SERVER_INTERNAL_ERROR)
      .json({ error: "Failed to fetch user with posts." });
  }
};

// Get all users with optional search
module.exports.getAllUsersController = async (req, res) => {
  const { error } = searchSchema.validate({ search: req.query.search });
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const search = req.query.search || "";
  try {
    const result = await getAllUsers(search);
    res.status(SERVER_CREATED_HTTP_CODE).json(result);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to fetch users." });
  }
};

// Get user by username
module.exports.getUserByUsername = async (req, res) => {
  const { error } = usernameQuerySchema.validate(req.query);
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const { username } = req.query;
  try {
    const result = await getUserByUsername(username);
    res.status(SERVER_CREATED_HTTP_CODE).json(result);
  } catch (error) {
    console.error("Error fetching user by username:", error.message);
    res
      .status(SERVER_INTERNAL_ERROR)
      .json({ error: "Failed to fetch user by username." });
  }
};

// Update user profile
module.exports.UpdateUserProfileController = async (req, res) => {
  const { error } = updateUserProfileSchema.validate(req.body);
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  const token = req.headers["token"];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.userId;

  const { username, phone_number, password, email } = req.body;
  let path = "";
  let hashedPassword = password;

  if (password) {
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (hashError) {
      console.error("Error hashing password:", hashError.message);
      return res
        .status(SERVER_INTERNAL_ERROR)
        .json({ error: "Failed to hash password." });
    }
  }

  if (req.file) {
    path = `${Date.now()}.png`;
    try {
      fs.writeFileSync(`public/${path}`, req.file.buffer);
    } catch (fileError) {
      console.error("Error saving file:", fileError.message);
      return res
        .status(SERVER_INTERNAL_ERROR)
        .json({ error: "Failed to save profile picture." });
    }
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
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res
      .status(SERVER_INTERNAL_ERROR)
      .json({ error: "Failed to update profile." });
  }
};

module.exports.AddStories = async (req, res) => {
  const token = req.headers.token;
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.userId;
  let path = "";
  const storyId = randomstring.generate();
  console.log(req.file, "------> image");

  if (req.file) {
    path = `${Date.now()}.png`;
    try {
      fs.writeFileSync(`public/${path}`, req.file.buffer);
    } catch (fileError) {
      console.error("Error saving file:", fileError.message);
      return res
        .status(SERVER_INTERNAL_ERROR)
        .json({ error: "Failed to save profile picture." });
    }
  }

  try {
    await AddStory(storyId, path, userId, Date.now());
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res
      .status(SERVER_INTERNAL_ERROR)
      .json({ error: "Failed to update profile." });
  }
};

module.exports.addFollower = async (req, res) => {
  const { followerId } = req.body;
  const token = req.headers.token;

  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    // Fetch the current following list
    let following = await checkFollowing(userId);

    // If 'following' is a string, parse it
    if (following && following.length > 0) {
      following = JSON.parse(following[0].following);
    } else {
      following = [];
    }

    // Check if the user is already following the followerId
    const isAlreadyFollowing = following.some(
      (follower) => follower.followerId === followerId
    );

    if (isAlreadyFollowing) {
      return res
        .status(400)
        .json({ message: "User is already following this account." });
    }

    // Add the new follower
    await addFollower(followerId, userId, Date.now());

    // Send success response
    res.status(201).json({ message: "Following updated successfully!" });
  } catch (error) {
    console.error("Error updating following:", error.message);
    res.status(500).json({ error: "Failed to update following." });
  }
};

module.exports.deleteStroy = async () => {


  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    // Fetch the current following list
    let following = await checkFollowing(userId);

    // If 'following' is a string, parse it
    if (following && following.length > 0) {
      following = JSON.parse(following[0].following);
    } else {
      following = [];
    }

    // Check if the user is already following the followerId
    const isAlreadyFollowing = following.some(
      (follower) => follower.followerId === followerId
    );

    if (isAlreadyFollowing) {
      return res
        .status(400)
        .json({ message: "User is already following this account." });
    }

    // Add the new follower
    await addFollower(followerId, userId, Date.now());

    // Send success response
    res.status(201).json({ message: "Following updated successfully!" });
  } catch (error) {
    console.error("Error updating following:", error.message);
    res.status(500).json({ error: "Failed to update following." });
  }
};
