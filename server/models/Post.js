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

module.exports.getUserWithPosts = async (phone_number, email) => {
  try {
    let query = `SELECT * FROM users LEFT JOIN posts ON posts.userId = users.userId WHERE phone_number = ? OR email = ?;`;
    return await db.runQuerySync(query, [phone_number, email]);
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

module.exports.FetchCommentByPost = async (postId) => {
  try {
    let query = `SELECT comments FROM posts WHERE postId = ?`;
    return await db.runQuerySync(query, [postId]);
  } catch (error) {
    console.error("Error in LikePostModel:", error);
    return { error: "Failed to like the post. Please try again later." };
  }
};

module.exports.AddComment = async (postId, comment, userId) => {
  try {
    let query = `UPDATE posts SET comments = JSON_ARRAY_APPEND(comments, '$', JSON_OBJECT('userid', ?, 'comment', ?, 'postId', ?)) WHERE postId = ?`;
    return await db.runQuerySync(query, [userId, comment, postId, postId]);
  } catch (error) {
    console.error("Error in Add Comment:", error);
    return {
      error: "Failed to Add Comment to the post. Please try again later.",
    };
  }
};
module.exports.getPostById = async (postId) => {
  try {
    let query = `SELECT * FROM posts INNER JOIN users ON posts.userId = users.userId WHERE postId = ?;`;
    return await db.runQuerySync(query, [postId]);
  } catch (error) {
    return error;
  }
};
module.exports.UpdatePost = async (userId, caption, post, postId) => {
  try {
    let query = `UPDATE posts SET caption = ? , post = ? WHERE  userId = ? AND postId = ?`;
    if (post) {
      query = `UPDATE posts SET post = ? WHERE  userId = ? AND postId = ?`;
    }
    if (caption) {
      query = `UPDATE posts SET caption = ? WHERE  userId = ? AND postId = ?`;
    }
    if (post && caption) {
      query = `UPDATE posts SET caption = ? , post = ? WHERE  userId = ? AND postId = ?`;
    }
    return await db.runQuerySync(query, [caption, post, userId, postId]);
  } catch (error) {
    return error;
  }
};

module.exports.deletePost = async (postId) => {
  try {
    let query = `DELETE FROM posts WHERE postId = ?`;

    return await db.runQuerySync(query, [postId]);
  } catch (error) {
    return error;
  }
};
