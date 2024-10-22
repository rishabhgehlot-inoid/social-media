import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Image, SquareArrowLeft } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance, SERVER_URL } from "../config/instance";
import SimplePeer from "simple-peer";
const socket = io(SERVER_URL);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(0);
  const [sender, setSender] = useState(0);
  const [users, setUsers] = useState([]);
  const [typingStatus, setTypingStatus] = useState(""); // New state to store typing status
  const [isTyping, setIsTyping] = useState(false); // Flag to check if current user is typing
  const [onlineUsers, setOnlineUsers] = useState([]);
  const chatContainerRef = useRef();

  const [calling, setCalling] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false); // State for incoming call
  const [incomingCall, setIncomingCall] = useState(null); // Store incoming call details
  const [peer, setPeer] = useState(null);
  const userAudioRef = useRef();
  const remoteAudioRef = useRef();
  // References for local and remote audio/video streams

  const userVideoRef = useRef();
  const remoteVideoRef = useRef();

  const [isReceivingVideoCall, setIsReceivingVideoCall] = useState(false);
  const [incomingVideoCall, setIncomingVideoCall] = useState(null);

  // Function to start a video call
  const startVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const audioTrack = stream.getAudioTracks()[0]; // Check if audio track exists and is enabled
      console.log("Is audio track enabled:", audioTrack.enabled);
      if (stream.active) {
        const myPeer = new SimplePeer({ initiator: true, stream });
        setPeer(myPeer);

        // Emit signal to receiver to start the video call
        peer.on("signal", (data) => {
          socket.emit("video_call_signal", { to: receiver, signal: data });
        });

        // Play local video stream
        userVideoRef.current.srcObject = stream;
        userVideoRef.current.play();

        // Play remote video stream when received
        peer.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });

        // Handle call acceptance by the receiver
        socket.on("accept_video_call", (signal) => {
          peer.signal(signal);
        });

        setCalling(true);
        toast.success("Video call started!");
      }
    } catch (error) {
      console.error("Error accessing video/audio devices:", error);
      toast.error("Failed to start video call.");
    }
  };

  // Function to accept an incoming video call
  const acceptVideoCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userVideoRef.current.play();
        const peer = new SimplePeer({ initiator: false, stream });

        peer.on("signal", (data) => {
          socket.emit("accept_video_call", {
            signal: data,
            to: incomingVideoCall.from,
          });
        });

        peer.signal(incomingVideoCall.signal);

        peer.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });

        setPeer(peer);
        setIsReceivingVideoCall(false);
        setCalling(true);
      })
      .catch((error) => {
        console.error("Error accessing video/audio devices:", error);
        toast.error("Failed to accept video call.");
      });
  };

  // Decline an incoming video call
  const declineVideoCall = () => {
    setIsReceivingVideoCall(false);
    setIncomingVideoCall(null);
    toast.info("Video call declined.");
  };

  useEffect(() => {
    // Listen for incoming video call signal
    socket.on("receive_video_call_signal", (signalData) => {
      setIsReceivingVideoCall(true);
      setIncomingVideoCall(signalData);
    });

    return () => {
      socket.off("receive_video_call_signal");
    };
  }, []);
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
  const handleNewImage = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("sender", sender);
    formData.append("receiver", receiver);

    try {
      const response = await instance.post("/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("image", response.data.path);

      socket.emit("send_image", {
        imageUrl: response.data.path, // URL from server
        sender,
        receiver,
      });
      toast.success("Image sent successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to send image.");
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
      console.log(response.data);

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
  useEffect(() => {
    // Listen for incoming call signal
    socket.on("receive_voice_call_signal", (signalData) => {
      // When receiving a call, show the prompt to accept or reject
      setIsReceivingCall(true);
      setIncomingCall(signalData);
    });

    return () => {
      socket.off("receive_voice_call_signal");
    };
  }, []);

  const startVoiceCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (stream.active) {
        const peer = new SimplePeer({ initiator: true, stream });
        setPeer(peer);
        console.log("peer", peer);
        peer.on("iceStateChange", (state) => {
          console.log("ICE state changed to:", state);
        });

        peer.on("connect", () => {
          console.log("Peer connection established successfully.");
        });

        peer.on("signal", (data) => {
          // Send the signal to the receiver
          socket.emit("voice_call_signal", { to: receiver, signal: data });
        });

        peer.on("stream", (remoteStream) => {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play();
        });
        peer.on("error", (err) => {
          console.error("Peer connection error:", err);
        });
        socket.on("accept_voice_call", (signal) => {
          console.log("Signal received to accept the voice call:", signal);
          peer.signal(signal);
        });

        setCalling(true);
        toast.success("Voice call started!");
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Failed to access microphone.");
    }
  };

  const acceptCall = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        userAudioRef.current.srcObject = stream;
        const peer = new SimplePeer({ initiator: false, stream });

        peer.on("signal", (data) => {
          // Respond to the caller with the signal
          socket.emit("accept_voice_call", {
            signal: data,
            to: incomingCall.from,
          });
        });

        peer.signal(incomingCall.signal);

        peer.on("stream", (remoteStream) => {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play();
          userAudioRef.current.muted = true;
        });

        setPeer(peer);
        setIsReceivingCall(false); // Hide the incoming call prompt
        setCalling(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        toast.error("Failed to access microphone.");
      });
  };

  const declineCall = () => {
    setIsReceivingCall(false);
    setIncomingCall(null);
    toast.info("Call declined.");
  };
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
                          : `${SERVER_URL}/${item.profile_img}` // Local image URL
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
        <main>
          <div className="flex items-center gap-4">
            {/* Incoming voice call prompt */}
            {isReceivingCall && (
              <div className="incoming-call-popup bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm text-center">
                <h3 className="text-xl font-bold text-white mb-4">
                  Incoming Voice Call
                </h3>
                <div className="space-x-6 flex justify-center">
                  <button
                    onClick={acceptCall}
                    className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400"
                  >
                    Accept
                  </button>
                  <button
                    onClick={declineCall}
                    className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400"
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}

            {/* Voice call controls */}
            {receiver && (
              <div className="space-x-6 flex justify-center">
                <button
                  onClick={startVoiceCall}
                  disabled={calling}
                  className={`px-6 py-2 rounded-full text-white shadow-md transition-all ${
                    calling
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400"
                  }`}
                >
                  {calling ? "In Call..." : "Start Voice Call"}
                </button>
                {calling && (
                  <button
                    onClick={() => setCalling(false)}
                    className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400"
                  >
                    End Call
                  </button>
                )}
              </div>
            )}

            <audio ref={userAudioRef} autoPlay muted />
            <audio ref={remoteAudioRef} autoPlay />

            {/* Incoming video call prompt */}
            {isReceivingVideoCall && (
              <div className="incoming-call-popup bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm text-center">
                <h3 className="text-xl font-bold text-white mb-4">
                  Incoming Video Call
                </h3>
                <div className="space-x-6 flex justify-center">
                  <button
                    onClick={acceptVideoCall}
                    className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400"
                  >
                    Accept
                  </button>
                  <button
                    onClick={declineVideoCall}
                    className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400"
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}

            {/* Video call controls */}
            {receiver && (
              <div className="space-x-6 flex justify-center">
                <button
                  onClick={startVideoCall}
                  disabled={calling}
                  className={`px-6 py-2 rounded-full text-white shadow-md transition-all ${
                    calling
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400"
                  }`}
                >
                  {calling ? "In Video Call..." : "Start Video Call"}
                </button>
              </div>
            )}

            {/* Video elements for local and remote streams */}
            {isReceivingVideoCall && (
              <div className="flex justify-center space-x-6 mt-8">
                <video
                  ref={userVideoRef}
                  autoPlay
                  muted
                  className="local-video w-48 h-48 bg-black rounded-lg shadow-lg border-2 border-blue-500"
                />
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="remote-video w-48 h-48 bg-black rounded-lg shadow-lg border-2 border-blue-500"
                />
              </div>
            )}
          </div>
        </main>
        <section
          className="w-full h-[90%] md:h-[90%] overflow-y-scroll"
          ref={chatContainerRef}
        >
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
                <span
                  className="bg-black p-2 rounded-md max-w-[300px]"
                  dangerouslySetInnerHTML={{ __html: item.message }}
                />
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
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload"
              onChange={handleNewImage} // Updated for handling image upload
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer w-fit p-3 bg-black rounded-2xl"
            >
              <Image />
            </label>
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
