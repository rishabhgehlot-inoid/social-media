const db = require("../config/index");

module.exports.CreatePost = async (userId, caption, post, postId) => {
  try {
    let query = `INSERT INTO posts (caption,post,userId,postId) VALUES (?,?,?,?) `;
    return await db.runQuerySync(query, [caption, post, userId, postId]);
  } catch (error) {
    return error;
  }
};

module.exports.getPosts = async () => {
  try {
    let query = `SELECT * FROM posts INNER JOIN users ON posts.userId = users.userId;`;
    return await db.runQuerySync(query, []);
  } catch (error) {
    return error;
  }
};

module.exports.getUserWithPosts = async (phone_number) => {
  try {
    let query = `SELECT * FROM users LEFT JOIN posts ON posts.userId = users.userId WHERE phone_number = ?;`;
    return await db.runQuerySync(query, [phone_number]);
  } catch (error) {
    return error;
  }
};

module.exports.LikePostModel = async (postId) => {
  try {
    let query = `UPDATE posts SET likes = likes + 1 WHERE postId = ?;`;
    return await db.runQuerySync(query, [postId]);
  } catch (error) {
    console.error("Error in LikePostModel:", error);
    return { error: "Failed to like the post. Please try again later." };
  }
};

