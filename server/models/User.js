const db = require("../config/index");

module.exports.getUser = async (userId) => {
  try {
    let query = `SELECT * FROM users WHERE userId = ?`;
    return await db.runQuerySync(query, [userId]);
  } catch (error) {
    console.error("Error fetching user by phone number:", error.message);
    console.error("Database error: Could not retrieve user by phone number.");
  }
};

module.exports.getAllUsers = async (params) => {
  try {
    let query = `SELECT * FROM users`;
    if (params) query = `SELECT * FROM users WHERE username LIKE "%${params}%"`;
    return await db.runQuerySync(query, []);
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    console.error("Database error: Could not retrieve users.");
  }
};

module.exports.getUserByUsername = async (username) => {
  try {
    let query = `SELECT * FROM users LEFT JOIN posts ON posts.userId = users.userId WHERE username = ?`;
    return await db.runQuerySync(query, [username]);
  } catch (error) {
    console.error("Error fetching user by username:", error.message);
    console.error("Database error: Could not retrieve user by username.");
  }
};

module.exports.UpdateUser = async (
  userId,
  username,
  phone_number,
  password,
  email,
  profile_img
) => {
  try {
    let query = `UPDATE users SET username = ?, phone_number = ?, email = ? WHERE userId = ?`;

    if (password) {
      query = `UPDATE users SET username = ?, phone_number = ?, email = ?, password = '${password}' WHERE userId = ?`;
    }
    if (profile_img) {
      query = `UPDATE users SET username = ?, phone_number = ?, email = ?, profile_img = '${profile_img}' WHERE userId = ?`;
    }
    if (profile_img && password) {
      query = `UPDATE users SET username = ?, phone_number = ?, email = ?, password = '${password}', profile_img = '${profile_img}' WHERE userId = ?`;
    }

    return await db.runQuerySync(query, [
      username,
      phone_number,
      email,
      userId,
    ]);
  } catch (error) {
    console.error("Error updating user:", error.message);
    console.error("Database error: Could not update user information.");
  }
};
module.exports.AddStory = async (storyId, story_img, userId, createAt) => {
  try {
    // Update the user's stories, initializing it if null
    let query = `
      UPDATE users 
      SET stories = COALESCE(
          JSON_ARRAY_APPEND(stories, '$', JSON_OBJECT('story_img', ?, 'storyId', ?, 'createAt', ?)),
          JSON_ARRAY(JSON_OBJECT('story_img', ?, 'storyId', ?, 'createAt', ?))
      ) 
      WHERE userId = ?`;

    return await db.runQuerySync(query, [
      story_img,
      storyId,
      createAt,
      story_img,
      storyId,
      createAt,
      userId,
    ]);
  } catch (error) {
    console.error("Error adding stories:", error.message);
    console.error("Database error: Could not add stories.");
  }
};

module.exports.deleteOldStories = async () => {
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

  const query = `
    UPDATE users 
    SET stories = JSON_ARRAY_FILTER(stories, 
      (story) -> JSON_UNQUOTE(JSON_EXTRACT(story, '$.createAt')) >= ?) 
    WHERE userId IN (SELECT userId FROM users WHERE JSON_LENGTH(stories) > 0)`;

  await db.runQuerySync(query, [twentyFourHoursAgo]);
};

module.exports.addFollower = async (followerId, userId, createAt) => {
  try {
    let query = `
      UPDATE users 
      SET following = COALESCE(
          JSON_ARRAY_APPEND(following, '$', JSON_OBJECT('followerId', ?, 'createAt', ?)),
          JSON_ARRAY(JSON_OBJECT('followerId', ?, 'createAt', ?))
      ) 
      WHERE userId = ?`;

    return await db.runQuerySync(query, [
      followerId,
      createAt,
      followerId,
      createAt,
      userId,
    ]);
  } catch (error) {
    console.error("Error adding follower:", error.message);
    console.error("Database error: Could not add follower.");
  }
};
module.exports.checkFollowing = async (userId) => {
  try {
    let query = `
      SELECT following FROM users
      WHERE userId = ?`;

    return await db.runQuerySync(query, [userId]);
  } catch (error) {
    console.error("Error adding follower:", error.message);
    console.error("Database error: Could not add follower.");
  }
};
