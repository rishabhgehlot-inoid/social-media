const Joi = require("joi");
const {
  SERVER_CREATED_HTTP_CODE,
  SERVER_BAD_REQUEST,
  SERVER_INTERNAL_ERROR,
} = require("../config/constants");
const { AddChat, fetchChats } = require("../models/Chat");
const randomstring = require("randomstring");
const createUniqueWord = require("../services/createUniqeId");

// Validation schemas
const chatSchema = Joi.object({
  message: Joi.string().min(1).required(),
  sender: Joi.string().required(),
  receiver: Joi.string().required(),
});

// Add a new chat message
module.exports.AddChat = async (req, res) => {
  // Validate the input
  const { error } = chatSchema.validate(req.body);
  if (error) {
    return res.status(SERVER_BAD_REQUEST).json({ error: error.details[0].message });
  }

  const { message, sender, receiver } = req.body;
  const chatId = randomstring.generate();
  const threadId = createUniqueWord(sender, receiver);

  try {
    const posts = await AddChat(chatId, threadId, sender, receiver, message);
    res.status(SERVER_CREATED_HTTP_CODE).json(posts);
  } catch (error) {
    console.error("Error adding chat:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to add chat message." });
  }
};

// Fetch chat history
module.exports.fetchChats = async (req, res) => {
  // Validate the input
  const { error } = chatSchema.validate(req.body);
  if (error) {
    return res.status(SERVER_BAD_REQUEST).json({ error: error.details[0].message });
  }

  const { sender, receiver } = req.body;
  const threadId = createUniqueWord(sender, receiver);

  try {
    const chats = await fetchChats(threadId);
    res.status(SERVER_CREATED_HTTP_CODE).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error.message);
    res.status(SERVER_INTERNAL_ERROR).json({ error: "Failed to fetch chat messages." });
  }
};
