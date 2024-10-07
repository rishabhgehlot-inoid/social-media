const db = require("../config/index");

module.exports.CreatePost = async (userId, caption, post, postId) => {
  try {
    let query = `INSERT INTO posts (caption,post,userId,postId) VALUES (?,?,?,?)`;
    return await db.runQuerySync(query, [caption, post, userId, postId]);
  } catch (error) {
    console.error("Error creating post:", error.message);
    console.error("Database error: Could not create post.");
  }
};

module.exports.getPosts = async () => {
  try {
    let query = `SELECT * FROM posts INNER JOIN users ON posts.userId = users.userId;`;
    return await db.runQuerySync(query, []);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    console.error("Database error: Could not fetch posts.");
  }
};

module.exports.getUserWithPosts = async (phone_number, email) => {
  try {
    let query = `SELECT * FROM users LEFT JOIN posts ON posts.userId = users.userId WHERE phone_number = ? OR email = ?;`;
    return await db.runQuerySync(query, [phone_number, email]);
  } catch (error) {
    console.error("Error fetching user with posts:", error.message);
    console.error("Database error: Could not fetch user and posts.");
  }
};

module.exports.LikePostModel = async (postId) => {
  try {
    let query = `UPDATE posts SET likes = likes + 1 WHERE postId = ?;`;
    return await db.runQuerySync(query, [postId]);
  } catch (error) {
    console.error("Error liking post:", error.message);
    console.error("Database error: Could not like the post.");
  }
};

module.exports.FetchCommentByPost = async (postId) => {
  try {
    let query = `SELECT comments FROM posts WHERE postId = ?`;
    return await db.runQuerySync(query, [postId]);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    console.error("Database error: Could not fetch comments for the post.");
  }
};

module.exports.AddComment = async (postId, comment, userId) => {
  try {
    let query = `UPDATE posts SET comments = JSON_ARRAY_APPEND(comments, '$', JSON_OBJECT('userid', ?, 'comment', ?, 'postId', ?)) WHERE postId = ?`;
    return await db.runQuerySync(query, [userId, comment, postId, postId]);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    console.error("Database error: Could not add comment to the post.");
  }
};

module.exports.getPostById = async (postId) => {
  try {
    let query = `SELECT * FROM posts INNER JOIN users ON posts.userId = users.userId WHERE postId = ?;`;
    return await db.runQuerySync(query, [postId]);
  } catch (error) {
    console.error("Error fetching post by ID:", error.message);
    console.error("Database error: Could not fetch post by ID.");
  }
};

module.exports.UpdatePost = async (userId, caption, post, postId) => {
  try {
    let query = `UPDATE posts SET caption = ?, post = ? WHERE userId = ? AND postId = ?`;
    if (post && caption) {
      query = `UPDATE posts SET caption = ?, post = ? WHERE userId = ? AND postId = ?`;
      return await db.runQuerySync(query, [caption, post, userId, postId]);
    } else if (post) {
      query = `UPDATE posts SET post = ? WHERE userId = ? AND postId = ?`;
      return await db.runQuerySync(query, [post, userId, postId]);
    } else if (caption) {
      query = `UPDATE posts SET caption = ? WHERE userId = ? AND postId = ?`;
      return await db.runQuerySync(query, [caption, userId, postId]);
    }
  } catch (error) {
    console.error("Error updating post:", error.message);
    console.error("Database error: Could not update the post.");
  }
};

module.exports.deletePost = async (postId) => {
  try {
    let query = `DELETE FROM posts WHERE postId = ?`;
    return await db.runQuerySync(query, [postId]);
  } catch (error) {
    console.error("Error deleting post:", error.message);
    console.error("Database error: Could not delete post.");
  }
};
