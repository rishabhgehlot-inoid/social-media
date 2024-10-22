import { useState, useEffect } from "react";
import io from "socket.io-client";
import { SERVER_URL } from "../config/instance";

const socket = io(SERVER_URL);

const TicTacToe = () => {
  const [gameId, setGameId] = useState("");
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false); // Default to false for player O

  useEffect(() => {
    // Listen for game creation
    socket.on("game_created", ({ gameId, player1 }) => {
      setGameId(gameId);
      setPlayer("X");
      setIsGameStarted(true);
      setIsMyTurn(true); // Player X starts first
      console.log("Game created, you are player X. Waiting for player 2.");
    });

    // Listen for player joining
    socket.on("player_joined", ({ gameId, player2 }) => {
      setGameId(gameId);
      setPlayer("O");
      setIsGameStarted(true);
      setIsMyTurn(false); // Player O waits for X
      setBoard(Array(9).fill(null)); // Reset board on new game
      console.log("Player 2 joined, you are player O.");
    });

    // Listen for moves made by other players
    socket.on("move_made", ({ player, index }) => {
      console.log(`${player} made a move at index ${index}`);
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[index] = player; // Update board with the move
        return newBoard;
      });
      setIsMyTurn((prev) => !prev); // Switch turn
    });

    // Handle errors (e.g., game is full)
    socket.on("error_message", (message) => {
      alert(message);
    });

    // Clean up event listeners
    return () => {
      socket.off("game_created");
      socket.off("player_joined");
      socket.off("move_made");
      socket.off("error_message");
    };
  }, []);

  const createGame = () => {
    const newGameId = Math.random().toString(36).substr(2, 9);
    socket.emit("create_game", { gameId: newGameId, player1: "X" });
  };

  const joinGame = (gameId) => {
    socket.emit("join_game", { gameId, player2: "O" });
  };

  const handleMove = (index) => {
    if (isMyTurn && !board[index]) {
      // Check if it's your turn and the cell is empty
      socket.emit("make_move", { gameId, player, index });
      
      // Optimistic update: Update local board immediately for quick response
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[index] = player; // Update local board immediately for quick response
        return newBoard;
      });

      setIsMyTurn(false); // Switch turn to the opponent
    } else {
      console.log("Not your turn or spot already taken");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>

      {!isGameStarted && (
        <div className="mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            onClick={createGame}
          >
            Create Game
          </button>
          <input
            type="text"
            placeholder="Enter Game ID"
            className="border px-2 py-1 rounded mr-2"
            onChange={(e) => setGameId(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => joinGame(gameId)}
          >
            Join Game
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-white border-2 border-gray-300 flex items-center justify-center text-2xl font-bold cursor-pointer"
            onClick={() => handleMove(index)}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
