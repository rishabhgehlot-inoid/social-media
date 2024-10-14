const express = require("express");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const fs = require("fs");
const http = require("http");
const routes = require("./routes");
require("dotenv").config();
const cron = require("node-cron");
const cors = require("cors");
const { deleteOldStories } = require("./models/User");
const randomstring = require("randomstring");
const createUniqueWord = require("./services/createUniqeId");
const { AddChat } = require("./models/Chat");
const { upload } = require("./config/multerConfig");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.static("public"));
app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true, limit: "150mb" }));
app.use(bodyParser.json());

app.use(routes);

app.post("/uploadImage", upload.single("image"), (req, res) => {
  let path = "";
  try {
    if (req.file) {
      path = `${Date.now()}.png`;
      fs.writeFileSync(`public/${path}`, req.file.buffer);
      res.status(200).json({ path });
    }
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error, path });
  }
});

const onlineUsers = {};

// Socket.IO handling real-time chat
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id; // Map userId to socketId
    io.emit("user_online", userId); // Notify all users that this user is online
    console.log(`${userId} is online`, onlineUsers);
  });

  socket.on("send_message", async ({ message, sender, receiver }) => {
    const chatId = randomstring.generate();
    const threadId = createUniqueWord(sender, receiver);
    const result = await AddChat(chatId, threadId, sender, receiver, message);
    console.log("result, I am from socket.io-------------------->");

    io.emit("receive_message", result[0]);
  });

  socket.on("send_image", async ({ imageUrl, sender, receiver }) => {
    const chatId = randomstring.generate();
    const threadId = createUniqueWord(sender, receiver);
    const message = `<img src="${process.env.BASE_URL}/${imageUrl}" alt="Chat Image" className=" size-24"/>`; // Image as a message
    const result = await AddChat(chatId, threadId, sender, receiver, message);
    io.emit("receive_message", result[0]);
  });

  socket.on("typing", (user) => {
    socket.broadcast.emit("typing", user); // Notify other users who is typing
  });

  // User stop typing event
  socket.on("stop_typing", (user) => {
    socket.broadcast.emit("stop_typing", user); // Notify other users when the user stops typing
  });
  socket.on("disconnect", () => {
    const disconnectedUser = Object.keys(onlineUsers).find(
      (userId) => onlineUsers[userId] === socket.id
    );
    if (disconnectedUser) {
      delete onlineUsers[disconnectedUser]; // Remove user from onlineUsers list
      io.emit("user_offline", disconnectedUser); // Notify others that user is offline
      console.log(`${disconnectedUser} is offline`, onlineUsers);
    }
  });
});

cron.schedule("0 * * * *", async () => {
  try {
    await deleteOldStories();
  } catch (error) {
    console.error("Error deleting old stories:", error.message);
  }
});

const port = process.env.PORT || 4010;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
