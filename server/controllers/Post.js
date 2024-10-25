const Joi = require("joi");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const randomstring = require("randomstring");
const {
  SERVER_CREATED_HTTP_CODE,
  SERVER_BAD_REQUEST,
  SERVER_INTERNAL_ERROR,
} = require("../config/constants");
const {
  CreatePost,
  getPosts,
  LikePostModel,
  FetchCommentByPost,
  AddComment,
  getPostById,
  UpdatePost,
  deletePost,
  paginationPosts,
  checkLike,
  addLike,
} = require("../models/Post");
const { FindUserByPhoneNumber } = require("../models/Auth");
const res = require("express/lib/response");
const { post } = require("../routes");

// Validation schemas
const postSchema = Joi.object({
  caption: Joi.string().min(1).required(),
  token: Joi.string().required(),
});

const likePostSchema = Joi.object({
  postId: Joi.string().required(),
});

const commentSchema = Joi.object({
  postId: Joi.string().required(),
  comment: Joi.required(),
  userId: Joi.string().required(),
  type: Joi.string().required(),
});

const postIdQuerySchema = Joi.object({
  postId: Joi.string().required(),
});

// Create a new post
module.exports.CreatePost = async (req, res) => {
  const { caption } = req.body;
  const token = req.headers["token"];
  const { error } = postSchema.validate({
    caption,
    token,
  });

  // Check if validation error exists
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(SERVER_BAD_REQUEST).json({ error: "No files uploaded." });
  }

  let paths = [];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.userId;

  try {
    // Loop through all uploaded files
    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];
      const extension = file.mimetype.split("/")[1]; // Extract extension from MIME type
      const fileName = `${Date.now()}-${index}.${extension}`; // Unique filename with extension
      paths.push(fileName);

      // Save file to disk
      fs.writeFileSync(`public/${fileName}`, file.buffer);
    }

    const postId = randomstring.generate();
    await CreatePost(userId, caption, JSON.stringify(paths), postId);

    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "Post created successfully!" });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to create post." });
  }
};

// Get all posts
module.exports.getPostsController = async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(SERVER_CREATED_HTTP_CODE).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to fetch posts." });
  }
};

// Like a post
module.exports.setLikePost = async (req, res) => {
  const { error } = likePostSchema.validate(req.body);
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const { postId } = req.body;
  try {
    const result = await LikePostModel(postId);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ result, message: "Post liked successfully!" });
  } catch (error) {
    console.error("Error liking post:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to like post." });
  }
};

// Add a comment to a post
module.exports.AddCommentByPostController = async (req, res) => {
  const { postId, comment, userId, type } = req.body;
  try {
    let finalComment;
    if (type === "voice") {
      if (req.file) {
        finalComment = `${Date.now()}.mp3`;
        try {
          await fs.writeFileSync(`public/${finalComment}`, req.file.buffer);
        } catch (fileError) {
          console.error("Error saving file:", fileError.message);
          return res
            .status(SERVER_INTERNAL_ERROR)
            .json({ error: "Failed to save profile picture." });
        }
      }
    } else {
      finalComment = comment;
    }

    const result = await AddComment(postId, finalComment, userId, type);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ result, message: "Comment added successfully!" });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to add comment." });
  }
};

// Get a post by its ID
module.exports.getPostByIdController = async (req, res) => {
  const { error } = postIdQuerySchema.validate(req.query);
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const { postId } = req.query;
  try {
    const result = await getPostById(postId);

    const posts = await result.map((item) => {
      return {
        comments: JSON.parse(item.comments),
        likes: JSON.parse(item.likes),
      };
    });
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ posts, message: "Post fetched successfully!" });
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to fetch post." });
  }
};

// Update a post
module.exports.UpdatePost = async (req, res) => {
  const { caption, postId } = req.body;
  const token = req.headers["token"];

  const { error } = postSchema.validate({ caption, token });
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(SERVER_BAD_REQUEST).json({ error: "No files uploaded." });
  }

  let paths = [];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.userId;

  try {
    // Loop through all uploaded files
    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];
      const extension = file.mimetype.split("/")[1]; // Extract extension from MIME type
      const fileName = `${Date.now()}-${index}.${extension}`; // Unique filename with extension
      paths.push(fileName);

      // Save file to disk
      fs.writeFileSync(`public/${fileName}`, file.buffer);
    }

    await UpdatePost(userId, caption, JSON.stringify(paths), postId);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "Post updated successfully!" });
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to update post." });
  }
};

// Delete a post by ID
module.exports.deleteByPostId = async (req, res) => {
  const { error } = postIdQuerySchema.validate(req.params);
  if (error) {
    return res
      .status(SERVER_BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const postId = req.params.postId;
  try {
    const result = await deletePost(postId);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "Post deleted successfully!", result });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to delete post." });
  }
};

module.exports.paginationControllerForPosts = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.size || 5;
  let offset = (page - 1) * limit;
  try {
    const response = await paginationPosts(offset, limit);
    // console.log("response", response);
    let userPosts = await response.map((item) => {
      return {
        id: item.id,
        likes: JSON.parse(item.likes),
        postId: item.postId,
        username: item.username,
        profile_img: item.profile_img,
        token: item.token,
        caption: item.caption,
        post: JSON.parse(item.post),
        comment: JSON.parse(item.comments),
      };
    });
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.addLike = async (req, res) => {
  const token = req.headers.token;
  const { postId } = req.body;
  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    // Fetch the current following list
    let likes = await checkLike(postId);

    if (likes && likes.length > 0 && likes[0].likes != "") {
      likes = JSON.parse(likes[0].likes);
    } else {
      likes = [];
    }

    // Check if the user is already following the userId
    const isAlreadyLiked = likes.some((follower) => follower.userId === userId);
    // console.log("\n", "likes------------>", likes, "\n");
    if (isAlreadyLiked) {
      likes = JSON.stringify(likes.filter((like) => like.userId !== userId));
      await addLike(likes, postId);
      res.status(201).json({ message: "dislike updated successfully!" });
    } else {
      likes.push({ userId: userId, createAt: new Date() });
      likes = JSON.stringify(likes);
      await addLike(likes, postId);
      res.status(201).json({ message: "like updated successfully!" });
    }
  } catch (error) {
    console.error("Error updating like:", error.message);
    res.status(500).json({ error: "Failed to update like." });
  }
};
