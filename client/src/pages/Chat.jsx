import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { SquareArrowLeft } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:4010");

const Chat = () => {
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(0);
  const [sender, setSender] = useState(0);
  const [users, setUsers] = useState([]);
  const [typingStatus, setTypingStatus] = useState(""); // New state to store typing status
  const [isTyping, setIsTyping] = useState(false); // Flag to check if current user is typing
  const [onlineUsers, setOnlineUsers] = useState([]);
  const chatContainerRef = useRef();
  const handleNewMessage = async () => {
    if (!validateNewMessage()) return; // Validate the new message

    try {
      const newMessageChat = {
        message: newMessage,
        sender: sender,
        receiver: receiver,
      };
      socket.emit("send_message", newMessageChat);

      setNewMessage("");
      setIsTyping(false); // User stopped typing after sending message
      socket.emit("stop_typing", sender); // Notify others that typing stopped
      toast.success("Message sent successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message.");
    }
  };

  const validateNewMessage = () => {
    if (!newMessage.trim()) {
      toast.error("Message cannot be empty!");
      return false;
    }
    if (newMessage.length > 500) {
      // Set a max length for messages
      toast.error("Message is too long! Max length is 500 characters.");
      return false;
    }
    return true;
  };

  const handleUsers = async () => {
    try {
      const response = await instance.get("/getAllUsers");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users.");
    }
  };

  const handleMe = async () => {
    try {
      const response = await instance.get("/getUser");
      console.log(response.data, "it is me ----------------");
      setSender(response.data[0].userId);
      socket.emit("join", response.data[0].userId);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch your details.");
    }
  };

  useEffect(() => {
    handleUsers();
    handleMe();
    // Listen for online/offline events
    socket.on("user_online", (userId) => {
      setOnlineUsers((prevOnlineUsers) => [...prevOnlineUsers, userId]);
    });

    socket.on("user_offline", (userId) => {
      setOnlineUsers((prevOnlineUsers) =>
        prevOnlineUsers.filter((id) => id !== userId)
      ); // Remove from online users
    });

    return () => {
      socket.off("user_online");
      socket.off("user_offline");
    };
  }, [receiver]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data----------->", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listening for typing status
    socket.on("typing", (user) => {
      console.log(user);

      setTypingStatus(`typing...`);
    });

    socket.on("stop_typing", () => {
      setTypingStatus(""); // Clear the typing status when the user stops typing
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, []);

  useEffect(() => {
    const handleFetchChat = async () => {
      instance
        .post("/fetchChats", {
          sender,
          receiver,
        })
        .then((response) => {
          setMessages(response.data);
          console.log("response.data--------------->", response.data);
        })
        .catch((error) => console.error("Error fetching messages:", error));
    };
    handleFetchChat();
  }, [sender, receiver]);

  // Handle typing indicator logic
  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { userId: sender, username: "YourUsername" }); // Emit typing event with user info
    }

    // Timeout to reset typing state after user stops typing for 1 second
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stop_typing", { userId: sender });
    }, 1000);

    return () => clearTimeout(typingTimeout); // Clear previous timeout on each keystroke
  };
  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-gray-950 text-white flex animate-fadeIn">
      <main
        className={`md:w-[500px] w-full bg-gray-900 h-full overflow-y-scroll ${
          receiver ? " hidden md:block" : "block md:block"
        }`}
      >
        {users.length > 0 &&
          users.map((item) => (
            <div
              className={`w-full shadow-2xl flex gap-3 items-center p-4 ${
                receiver === item.userId ? " bg-gray-600" : ""
              }`}
              key={item.userId}
              onClick={() => setReceiver(item.userId)}
            >
              <div className="w-20 h-20 bg-white rounded-full">
                {item.profile_img ? (
                  <div className=" relative">
                    <img
                      src={
                        item.profile_img.includes("googleusercontent")
                          ? item.profile_img // Google profile image URL
                          : `http://localhost:4010/${item.profile_img}` // Local image URL
                      }
                      className="w-20 h-20 rounded-full"
                    />
                    {onlineUsers.includes(item.userId) && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <h1 className="font-bold text-xl">{item.username}</h1>
                {receiver === item.userId && (
                  <div className=" text-green-400">{typingStatus}</div>
                )}
                {/* Show online status */}
              </div>
            </div>
          ))}
      </main>
      <main
        className={`flex flex-col justify-between w-full p-4 pb-[4rem] md:pb-4 ${
          receiver ? "block md:block" : "hidden md:block"
        }`}
      >
        <section className="w-full h-[90%] md:h-[95%] overflow-y-scroll" ref={chatContainerRef}>
          <SquareArrowLeft
            onClick={() => {
              setReceiver(0);
            }}
            className="md:hidden fixed"
          />
          {messages.length > 0 &&
            messages.map((item, index) => (
              <div
                className={`py-2 flex ${
                  sender === item.sender ? "justify-end" : "justify-start"
                }`}
                key={index}
              >
                <span className="bg-black p-2 rounded-md">{item.message}</span>
              </div>
            ))}
        </section>

        {receiver && (
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full p-3 bg-black rounded-2xl"
              placeholder="Message..."
              value={newMessage}
              onChange={handleTyping} // Updated for typing handler
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNewMessage();
              }}
            />
            <button
              className="w-fit p-3 bg-black rounded-2xl"
              onClick={handleNewMessage}
            >
              Send
            </button>
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
};

export default Chat;
