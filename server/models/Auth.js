const db = require("../config/index");

module.exports.CreateUserTable = async () => {
  let query = `CREATE TABLE IF NOT EXISTS users(userId int AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20), phone_number VARCHAR(13),password VARCHAR(50), token VARCHAR(50))`;
  return await db.runQuerySync(query, []);
};
module.exports.RegisterUser = async (
  userId,
  username,
  phone_number,
  password,
  token
) => {
  try {
    let query = `INSERT INTO users (userId,username, phone_number, password,token,createdAt,updatedAt) VALUES (?, ? , ? , ?, ?,?,?)`;
    return await db.runQuerySync(query, [
      userId,
      username,
      phone_number,
      password,
      token,
      new Date(),
      new Date(),
    ]);
  } catch (error) {
    return error;
  }
};
module.exports.UserIsExistOrNot = async (username, phone_number) => {
  try {
    let query = `SELECT * FROM users WHERE users.username = ? OR users.phone_number = ?`;
    return await db.runQuerySync(query, [username, phone_number]);
  } catch (error) {
    return error;
  }
};
module.exports.UserIsExistOrNotForLogin = async (phone_number) => {
  try {
    let query = `SELECT * FROM users WHERE users.phone_number = ?`;
    return await db.runQuerySync(query, [phone_number]);
  } catch (error) {
    return error;
  }
};
module.exports.UserIsExistOrNotForLoginUsingEmail = async (email) => {
  try {
    let query = `SELECT * FROM users WHERE users.email = ?`;
    return await db.runQuerySync(query, [email]);
  } catch (error) {
    return error;
  }
};
module.exports.UserLogin = async (phone_number, token) => {
  try {
    let query = `UPDATE users SET token = ? WHERE users.phone_number = ? `;
    return await db.runQuerySync(query, [token, phone_number]);
  } catch (error) {
    return error;
  }
};

module.exports.FindUserByPhoneNumber = async (phone_number) => {
  try {
    let query = `SELECT * FROM users WHERE users.phone_number = ?`;
    return await db.runQuerySync(query, [phone_number]);
  } catch (error) {
    return error;
  }
};

module.exports.RegisterUserUsingGoogle = async (
  userId,
  username,
  email,
  password,
  token,
  profile_img
) => {
  try {
    let query = `INSERT INTO users (userId, username, email, password ,token,profile_img ) VALUES (?, ? , ? , ?, ?, ?)`;
    return await db.runQuerySync(query, [
      userId,
      username,
      email,
      password,
      token,
      profile_img,
    ]);
  } catch (error) {
    return error;
  }
};
module.exports.UserLoginUsingGoogle = async (email, token) => {
  try {
    let query = `UPDATE users SET token = ? WHERE users.email = ? `;
    return await db.runQuerySync(query, [token, email]);
  } catch (error) {
    return error;
  }
};
