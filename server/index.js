const express = require("express");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const routes = require("./routes");
require("dotenv").config();
const cron = require("node-cron");
const cors = require("cors");
const { deleteOldStories } = require("./models/User");
const randomstring = require("randomstring");
const createUniqueWord = require("./services/createUniqeId");
const { AddChat } = require("./models/Chat");
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

// Socket.IO handling real-time chat
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("send_message", async ({ message, sender, receiver }) => {
    const chatId = randomstring.generate();
    const threadId = createUniqueWord(sender, receiver);
    const result = await AddChat(chatId, threadId, sender, receiver, message);
    console.log("result, I am from socket.io-------------------->");

    io.emit("receive_message", result[0]);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
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
