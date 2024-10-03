const db = require("../config/index");

module.exports.AddChat = async (
  chatId,
  threadId,
  sender,
  receiver,
  message
) => {
  try {
    let query = `INSERT INTO chat (chatId,threadId,userId,sender,receiver,message) VALUES( ?,?,?,?,?,?);`;
    return await db.runQuerySync(query, [
      chatId,
      threadId,
      sender,
      sender,
      receiver,
      message,
    ]);
  } catch (error) {
    return error;
  }
};

module.exports.fetchChats = async (threadId) => {
  try {
    // let query = `SELECT * FROM chat LEFT JOIN users ON chat.sender = users.userId WHERE sender = ? OR receiver = ? ORDER BY chatId`;
    let query = `SELECT * FROM chat WHERE threadId = ? ORDER BY createdAt`;
    return await db.runQuerySync(query, [threadId]);
  } catch (error) {
    return error;
  }
};
