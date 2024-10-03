const db = require("../config/index");

module.exports.getUser = async (phone_number) => {
  try {
    let query = `SELECT * FROM users WHERE users.phone_number = ?`;
    return await db.runQuerySync(query, [phone_number]);
  } catch (error) {
    return error;
  }
};

module.exports.getAllUsers = async (params) => {
  try {
    let query = `SELECT * FROM users`;
    if (params) query = `SELECT * FROM users WHERE username LIKE "%${params}%"`;
    return await db.runQuerySync(query, []);
  } catch (error) {
    return error;
  }
};

module.exports.getUserByUsername = async (username) => {
  try {
    let query = `SELECT * FROM users LEFT JOIN posts ON posts.userId = users.userId WHERE username = ?`;
    return await db.runQuerySync(query, [username]);
  } catch (error) {
    return error;
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
    let query = `UPDATE users SET username = ? ,phone_number = ?, email = ? WHERE userId = ?`;
    console.log(password, profile_img, "----------------------?uudsjh");

    if (password) {
      query = `UPDATE users SET username = ? ,phone_number = ? ,  email = ?, password = '${password}' WHERE userId = ?`;
    }
    if (profile_img) {
      query = `UPDATE users SET username = ? ,phone_number = ? , email = ? , profile_img = '${profile_img}'  WHERE userId = ?`;
    }
    if (profile_img && password) {
      query = `UPDATE users SET username = ? ,phone_number = ? ,  email = ? ,password = '${password}', profile_img = '${profile_img}'  WHERE userId = ?`;
    }
    return await db.runQuerySync(query, [
      username,
      phone_number,
      email,
      userId,
    ]);
  } catch (error) {
    return error;
  }
};
