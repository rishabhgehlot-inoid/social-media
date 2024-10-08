const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
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
const { generateJWTToken } = require("../services/jwtService");

// Validation schemas
const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  phone_number: Joi.string().length(13).required(),
  password: Joi.string().min(6).required(),
});

const googleRegisterSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profile_img: Joi.string().optional(),
});

const loginSchema = Joi.object({
  phone_number: Joi.string().length(13).required(),
  password: Joi.string().min(6).required(),
});

const googleLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Create user table
module.exports.CreateTable = async (req, res) => {
  try {
    const result = await CreateUserTable();
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ result, message: "Table is Created" });
  } catch (error) {
    console.error("Error creating table:", error.message);
    res.status(SERVER_BAD_REQUEST).json({ error: "Failed to create table." });
  }
};

// Register user
module.exports.RegisterUserController = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, phone_number, password } = req.body;

  try {
    const result = await UserIsExistOrNot(username, phone_number);
    if (result.length > 0) {
      return res.status(400).json({ error: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const uuid = uuidv4();
    const token = generateJWTToken({ username, phone_number, userId: uuid });

    await RegisterUser(uuid, username, phone_number, hashedPassword, token);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "User registered", token });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(SERVER_BAD_REQUEST).json({ error: "Failed to register user." });
  }
};

// Register user using Google
module.exports.RegisterUserUsingGoogle = async (req, res) => {
  const { error } = googleRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, email, password, profile_img } = req.body;

  try {
    const result = await UserIsExistOrNotForLoginUsingEmail(email);
    if (result.length > 0) {
      return res.status(400).json({ error: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const uuid = uuidv4();
    const token = generateJWTToken({ username, email, userId: uuid });

    await RegisterUserUsingGoogle(
      uuid,
      username,
      email,
      hashedPassword,
      token,
      profile_img
    );
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "User registered", token });
  } catch (error) {
    console.error("Error registering user using Google:", error.message);
    res.status(SERVER_BAD_REQUEST).json({ error: "Failed to register user." });
  }
};

// User login
module.exports.LoginController = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { phone_number, password } = req.body;

  try {
    const result = await UserIsExistOrNotForLogin(phone_number);
    if (result.length === 0) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const resultPassword = result[0].password;
    const userId = result[0].userId;
    const passwordMatch = await bcrypt.compare(password, resultPassword);

    if (passwordMatch) {
      const token = generateJWTToken({ phone_number, userId: userId });
      await UserLogin(phone_number, token);
      res
        .status(SERVER_CREATED_HTTP_CODE)
        .json({ message: "Login successful", token });
    } else {
      res.status(400).json({ error: "Incorrect password." });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(SERVER_BAD_REQUEST).json({ error: "Failed to log in." });
  }
};

// User login using Google
module.exports.LoginControllerUsingGoogle = async (req, res) => {
  const { error } = googleLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const result = await UserIsExistOrNotForLoginUsingEmail(email);
    if (result.length === 0) {
      return res.status(400).json({ error: "User does not exist." });
    }

    // const resultPassword = result[0].password;
    const phone_number = result[0].phone_number;
    const userId = result[0].userId;
    // const passwordMatch = await bcrypt.compare(password, resultPassword);

    // if (passwordMatch) {
    const token = generateJWTToken({ phone_number, email, userId: userId });
    await UserLogin(phone_number, token);
    res
      .status(SERVER_CREATED_HTTP_CODE)
      .json({ message: "Login successful", token });
    // } else {
    //   res.status(400).json({ error: "Incorrect password." });
    // }
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
    res.status(SERVER_BAD_REQUEST).json({ error: "Failed to log in." });
  }
};
