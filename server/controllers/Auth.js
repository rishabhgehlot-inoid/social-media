const {
  SERVER_CREATED_HTTP_CODE,
  SERVER_BAD_REQUEST,
} = require("../config/constants");
const {
  CreateUserTable,
  RegisterUser,
  UserIsExistOrNot,
  UserLogin,
  UserIsExistOrNotForLogin,
  RegisterUserUsingGoogle,
  UserIsExistOrNotForLoginUsingEmail,
} = require("../models/Auth");
const bcrypt = require("bcryptjs");
const { generateJWTToken } = require("../services/jwtService");
const { v4: uuidv4 } = require("uuid");

module.exports.CreateTable = async (req, res) => {
  try {
    const result = await CreateUserTable();
    console.log(result);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ result, message: "Table is Created" });
  } catch (error) {
    console.log(error);
    res.status(SERVER_BAD_REQUEST).json({ error });
  }
};

module.exports.RegisterUserController = async (req, res) => {
  const { username, phone_number, password } = req.body;
  if (!username || !phone_number || !password) {
    res.status(400).json({
      error: "phone_number or Password or username fields cannot be empty!",
    });
    return;
  }
  const result = await UserIsExistOrNot(username, phone_number);
  if (result.length > 0) {
    res.status(400).json({
      error: "User is already Exist!",
    });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashedPassword", hashedPassword);
  console.log("hashedPassword", typeof hashedPassword);

  const token = generateJWTToken({ username, phone_number });
  const uuid = uuidv4();
  try {
    const result = await RegisterUser(
      uuid,
      username,
      phone_number,
      hashedPassword,
      token
    );
    console.log(result);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "User is Registered", token });
  } catch (error) {
    console.log(error);
    res.status(SERVER_BAD_REQUEST).json({ error });
  }
};

module.exports.RegisterUserUsingGoogle = async (req, res) => {
  const { username, email, password, profile_img } = req.body;
  console.log(username, email, password, profile_img), "------------->";

  if (!username || !email || !password) {
    res.status(400).json({
      error: "email or Password or username fields cannot be empty!",
      username,
      email,
      password,
      profile_img,
    });
    return;
  }

  const result = await UserIsExistOrNotForLoginUsingEmail(email);
  if (result.length > 0) {
    res.status(400).json({
      error: "User is already Exist!",
    });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashedPassword", hashedPassword);
  console.log("hashedPassword", typeof hashedPassword);

  const token = generateJWTToken({ username, email });
  const uuid = uuidv4();
  try {
    const result = await RegisterUserUsingGoogle(
      uuid,
      username,
      email,
      hashedPassword,
      token,
      profile_img
    );
    console.log(result);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "User is Registered", token });
  } catch (error) {
    console.log(error);
    res.status(SERVER_BAD_REQUEST).json({ error });
  }
};

module.exports.LoginController = async (req, res) => {
  const { phone_number, password } = req.body;
  let token;
  if (!phone_number || !password) {
    res.status(400).json({
      error: "Password or username fields cannot be empty!",
    });
    return;
  }
  const result = await UserIsExistOrNotForLogin(phone_number);
  if (result.length == 0) {
    res.status(400).json({
      error: "User is not Exist!",
    });
    return;
  }
  const resultPassword = result[0].password;

  console.log("resultPassword", resultPassword);
  console.log("resultPassword", typeof resultPassword);
  try {
    const passwordMatch = await bcrypt.compare(password, resultPassword);
    if (passwordMatch) {
      token = generateJWTToken({ phone_number });
      const result = UserLogin(phone_number, token);
      console.log(result);
      res
        .status(SERVER_CREATED_HTTP_CODE)
        .json({ message: "User is Login", token, status: true });
    } else {
      res.status(SERVER_BAD_REQUEST).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(SERVER_BAD_REQUEST).json({ error });
  }
};

module.exports.LoginControllerUsingGoogle = async (req, res) => {
  const { email, password } = req.body;
  let token;
  if (!email || !password) {
    res.status(400).json({
      error: "Password or username fields cannot be empty!",
    });
    return;
  }
  const result = await UserIsExistOrNotForLoginUsingEmail(email);
  if (result.length == 0) {
    res.status(400).json({
      error: "User is not Exist!",
    });
    return;
  }
  const resultPassword = result[0].password;
  const phone_number = result[0].phone_number;

  console.log("resultPassword", resultPassword);
  console.log("resultPassword", typeof resultPassword);
  try {
    const passwordMatch = await bcrypt.compare(password, resultPassword);
    if (passwordMatch) {
      token = generateJWTToken({ phone_number, email });
      const result = UserLogin(phone_number, token);
      console.log(result);
      res
        .status(SERVER_CREATED_HTTP_CODE)
        .json({ message: "User is Login", token, status: true });
    } else {
      res.status(SERVER_BAD_REQUEST).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(SERVER_BAD_REQUEST).json({ error });
  }
};
