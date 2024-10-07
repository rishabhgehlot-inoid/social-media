const db = require("../config/index");

module.exports.CreateUserTable = async () => {
  let query = `CREATE TABLE IF NOT EXISTS users(userId int AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20), phone_number VARCHAR(13), password VARCHAR(50), token VARCHAR(50), email VARCHAR(50), profile_img VARCHAR(255), createdAt DATETIME, updatedAt DATETIME)`;
  try {
    return await db.runQuerySync(query, []);
  } catch (error) {
    console.error("Error creating users table:", error.message);
    console.error("Database error: Could not create users table.");
  }
};

module.exports.RegisterUser = async (userId, username, phone_number, password, token) => {
  let query = `INSERT INTO users (userId, username, phone_number, password, token, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  try {
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
    console.error("Error registering user:", error.message);
    console.error("Database error: Could not register user.");
  }
};

module.exports.UserIsExistOrNot = async (username, phone_number) => {
  let query = `SELECT * FROM users WHERE users.username = ? OR users.phone_number = ?`;
  try {
    return await db.runQuerySync(query, [username, phone_number]);
  } catch (error) {
    console.error("Error checking if user exists:", error.message);
    console.error("Database error: Could not check if user exists.");
  }
};

module.exports.UserIsExistOrNotForLogin = async (phone_number) => {
  let query = `SELECT * FROM users WHERE users.phone_number = ?`;
  try {
    return await db.runQuerySync(query, [phone_number]);
  } catch (error) {
    console.error("Error checking if user exists for login:", error.message);
    console.error("Database error: Could not check if user exists for login.");
  }
};

module.exports.UserIsExistOrNotForLoginUsingEmail = async (email) => {
  let query = `SELECT * FROM users WHERE users.email = ?`;
  try {
    return await db.runQuerySync(query, [email]);
  } catch (error) {
    console.error("Error checking if user exists for login using email:", error.message);
    console.error("Database error: Could not check if user exists for login using email.");
  }
};

module.exports.UserLogin = async (phone_number, token) => {
  let query = `UPDATE users SET token = ? WHERE users.phone_number = ?`;
  try {
    return await db.runQuerySync(query, [token, phone_number]);
  } catch (error) {
    console.error("Error updating user token for login:", error.message);
    console.error("Database error: Could not update token for login.");
  }
};

module.exports.FindUserByPhoneNumber = async (phone_number) => {
  let query = `SELECT * FROM users WHERE users.phone_number = ?`;
  try {
    return await db.runQuerySync(query, [phone_number]);
  } catch (error) {
    console.error("Error finding user by phone number:", error.message);
    console.error("Database error: Could not find user by phone number.");
  }
};

module.exports.RegisterUserUsingGoogle = async (userId, username, email, password, token, profile_img) => {
  let query = `INSERT INTO users (userId, username, email, password, token, profile_img, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    return await db.runQuerySync(query, [
      userId,
      username,
      email,
      password,
      token,
      profile_img,
      new Date(),
      new Date(),
    ]);
  } catch (error) {
    console.error("Error registering user using Google:", error.message);
    console.error("Database error: Could not register user using Google.");
  }
};

module.exports.UserLoginUsingGoogle = async (email, token) => {
  let query = `UPDATE users SET token = ? WHERE users.email = ?`;
  try {
    return await db.runQuerySync(query, [token, email]);
  } catch (error) {
    console.error("Error updating user token for Google login:", error.message);
    console.error("Database error: Could not update token for Google login.");
  }
};
