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
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Use Map for onlineUsers for better performance
const onlineUsers = new Map();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "150mb" }));
app.use(bodyParser.json());
app.use(routes);

// Image upload route
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

// Handle real-time chat and signaling
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id); // Map userId to socketId
    io.emit("user_online", userId); // Notify all users that this user is online
    console.log(`${userId} is online`, Array.from(onlineUsers.entries()));
  });

  socket.on("send_message", async ({ message, sender, receiver }) => {
    const chatId = randomstring.generate();
    const threadId = createUniqueWord(sender, receiver);
    const result = await AddChat(chatId, threadId, sender, receiver, message);
    io.emit("receive_message", result[0]);
  });

  socket.on("send_image", async ({ imageUrl, sender, receiver }) => {
    const chatId = randomstring.generate();
    const threadId = createUniqueWord(sender, receiver);
    const message = `<img src="${process.env.BASE_URL}/${imageUrl}" alt="Chat Image" className=" size-24"/>`;
    const result = await AddChat(chatId, threadId, sender, receiver, message);
    io.emit("receive_message", result[0]);
  });

  // Video call signaling
  socket.on("video_call_signal", (data) => {
    const { to, signal } = data;
    const receiverSocket = onlineUsers.get(to);
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_video_call_signal", {
        signal,
        from: socket.id,
      });
    }
  });

  // Accept video call
  socket.on("accept_video_call", (data) => {
    const { to, signal } = data;
    const callerSocket = onlineUsers.get(to);
    if (callerSocket) {
      io.to(callerSocket).emit("accept_video_call", signal);
    }
  });

  // Voice call signaling
  socket.on("voice_call_signal", (data) => {
    const { to, signal } = data;
    const receiverSocket = onlineUsers.get(to);
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_voice_call_signal", {
        signal,
        from: socket.id,
      });
    }
  });

  // Accept voice call
  socket.on("accept_voice_call", (data) => {
    const { to, signal } = data;
    const callerSocket = onlineUsers.get(to);
    if (callerSocket) {
      io.to(callerSocket).emit("accept_voice_call", signal);
    }
  });

  // Handle typing indicator
  socket.on("typing", (user) => {
    socket.broadcast.emit("typing", user);
  });

  // Handle stop typing event
  socket.on("stop_typing", (user) => {
    socket.broadcast.emit("stop_typing", user);
  });
  const games = new Map();

  // Create a new game
  socket.on("create_game", (data) => {
    const { gameId, player1 } = data;
    socket.join(gameId);
    games.set(gameId, {
      players: { X: player1, O: null }, // Initial players
      board: Array(9).fill(null), // Initial board state
      currentPlayer: "X", // Player X starts
    });
    socket.emit("game_created", { gameId, player1 });
    console.log(`Game created by ${player1} with ID: ${gameId}`);
  });

  // Join an existing game
  socket.on("join_game", (data) => {
    const { gameId, player2 } = data;
    console.log(`Attempting to join game ID: ${gameId} for player: ${player2}`); // Debug log
    const game = games.get(gameId);

    if (game) {
      if (!game.players.O) {
        socket.join(gameId);
        game.players.O = player2; // Assign Player O
        socket.emit("join_game", { gameId: "game123", player2: "Player2" });
        // Send the current board state to the joining player
        socket.emit("game_state", game.board); // Send current board state
        io.in(gameId).emit("move_made", { player: "X", index: null }); // Notify that Player O has joined
        console.log(`${player2} joined the game ${gameId}`);
      } else {
        socket.emit("error_message", "Game is full"); // Changed message for clarity
      }
    } else {
      socket.emit("error_message", "Game does not exist"); // Message for non-existent game
    }
  });

  // Make a move in the game
  socket.on("make_move", (data) => {
    const { gameId, player, index } = data;
    const game = games.get(gameId);

    if (game) {
      // Check if it's the correct player's turn
      if (game.currentPlayer === player && !game.board[index]) {
        game.board[index] = player; // Update the board
        game.currentPlayer = player === "X" ? "O" : "X"; // Switch turns
        io.in(gameId).emit("move_made", { player, index }); // Notify all players about the move
      } else {
        socket.emit("error_message", "Not your turn or spot already taken");
      }
    } else {
      socket.emit("error_message", "Game does not exist");
    }
  });
  // Handle disconnect
  socket.on("disconnect", () => {
    const disconnectedUser = Array.from(onlineUsers.entries()).find(
      ([userId, socketId]) => socketId === socket.id
    );
    if (disconnectedUser) {
      onlineUsers.delete(disconnectedUser[0]);
      io.emit("user_offline", disconnectedUser[0]);
      console.log(
        `${disconnectedUser[0]} is offline`,
        Array.from(onlineUsers.entries())
      );
    }
  });
});

// Cron job to delete old stories
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
