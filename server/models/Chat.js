const db = require("../config/index");

module.exports.AddChat = async (
  chatId,
  threadId,
  sender,
  receiver,
  message
) => {
  try {
    let query = `INSERT INTO chat (chatId, threadId, userId, sender, receiver, message, createdAt) VALUES( ?,?,?,?,?,?,?)`;
    return await db.runQuerySync(query, [
      chatId,
      threadId,
      sender,
      sender,
      receiver,
      message,
      new Date(),
    ]);
  } catch (error) {
    console.error("Error adding chat:", error.message);
    console.error("Database error: Could not add chat message.");
  }
};

module.exports.fetchChats = async (threadId) => {
  try {
    let query = `SELECT * FROM chat WHERE threadId = ? ORDER BY createdAt`;
    return await db.runQuerySync(query, [threadId]);
  } catch (error) {
    console.error("Error fetching chats:", error.message);
    console.error("Database error: Could not fetch chats for the thread.");
  }
};
