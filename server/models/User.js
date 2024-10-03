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
