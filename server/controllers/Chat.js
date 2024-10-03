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
  FindUserByPhoneNumber,
} = require("../models/Auth");
const bcrypt = require("bcryptjs");
const { generateJWTToken } = require("../services/jwtService");
const { CreatePost, getPosts } = require("../models/Post");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { AddChat, fetchChats } = require("../models/Chat");
let randomstring = require("randomstring");
const createUniqueWord = require("../services/createUniqeId");
module.exports.AddChat = async (req, res) => {
  const { message, sender, receiver } = req.body;
  const chatId = randomstring.generate();
  const threadId = createUniqueWord(sender, receiver);
  try {
    const posts = await AddChat(chatId, threadId, sender, receiver, message);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.fetchChats = async (req, res) => {
  const { sender, receiver } = req.body;
  const threadId = createUniqueWord(sender, receiver);
  try {
    const chats = await fetchChats(threadId);
    console.log("chats--------", chats);

    res.status(201).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
