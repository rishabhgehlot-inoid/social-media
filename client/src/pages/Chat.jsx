import axios from "axios";
import { useEffect, useState } from "react";
import { onValue, push, ref } from "firebase/database";
import { database } from "../firebase";
import { SquareArrowLeft } from "lucide-react";
const Chat = () => {
  function createUniqueWord(word1, word2) {
    const sortedWords = [word1, word2].sort();
    const uniqueWord = sortedWords.join("-");
    return uniqueWord;
  }
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

  const handleNewMessage = async () => {
    console.log({
      message: newMessage,
      sender: sender,
      receiver: receiver,
      seen: 0,
    });
    if (newMessage) {
      writeUserData(sender, receiver, newMessage);
    }
    try {
      await instance.post("/addChat", {
        message: newMessage,
        sender: sender,
        receiver: receiver,
      });
      setNewMessage(""); // Reset newMessage after successful post
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsers = async () => {
    try {
      const response = await instance.get("/getAllUsers");
      console.log(response.data);
      setUsers(response.data);
      // setReceiver(response.data[0].userId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMe = async () => {
    try {
      const response = await instance.get("/getUser");
      console.log(response.data, "it is me ----------------");
      setSender(response.data[0].userId);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleFetchChats = async () => {
  //   try {
  //     const response = await instance.post("/fetchChats", {
  //       sender: sender,
  //       receiver: receiver,
  //     });
  //     setMessages(response.data);
  //     console.log(response.data, "-------------------------------chats");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    handleUsers();
    handleMe();
    // handleFetchChats();
  }, []);
  // useEffect(() => {
  //   handleFetchChats();
  // }, [sender, receiver, newMessage, users]);

  useEffect(() => {
    const starCountRef = ref(database, "chats/");
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(
        Object.keys(data)
          .map((key) => data[key])
          .filter(
            (item) => item.threadId === createUniqueWord(sender, receiver)
          )
      );
      console.log(messages, "------------------------------>message");
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, [sender, receiver, users]); // Removed newMessage from dependency array

  function writeUserData(sender, receiver, message) {
    const messageData = {
      sender: sender,
      receiver: receiver,
      message: message,
      threadId: createUniqueWord(sender, receiver),
      timestamp: Date.now(),
    };

    const messageRef = ref(database, `chats/`);

    push(messageRef, messageData);
  }

  return (
    <div className=" w-full h-[calc(100vh-80px)] bg-gray-950 text-white flex">
      <main
        className={` md:w-[500px] w-full bg-gray-900 h-full ${
          receiver ? " hidden md:block" : "block md:block"
        }`}
      >
        {users.length > 0 &&
          users.map((item) => {
            return (
              <div
                className={`w-full shadow-2xl flex gap-3 items-center p-4 ${
                  receiver === item.userId ? " bg-gray-600" : ""
                }`}
                key={item.userId}
                onClick={() => setReceiver(item.userId)}
              >
                <div className=" w-20 h-20 bg-white rounded-full">
                  {item.profile_img ? (
                    <img
                      src={`http://localhost:4010/${item.profile_img}`}
                      className=" w-20 h-20 rounded-full"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <h1 className="  font-bold text-xl">{item.username}</h1>
              </div>
            );
          })}
      </main>
      <main
        className={` flex flex-col justify-between w-full p-4 ${
          receiver ? "block md:block" : "hidden md:block"
        }`}
      >
        <section className=" w-full h-[90%] md:h-[95%] overflow-y-scroll">
          <SquareArrowLeft
            onClick={() => {
              setReceiver(0);
            }}
            className=" md:hidden fixed"
          />
          {messages.length > 0 &&
            messages.map((item, index) => {
              return (
                <div
                  className={`py-2 flex ${
                    sender === item.sender ? "justify-end" : " justify-start"
                  }`}
                  key={index}
                >
                  <span className=" bg-black p-2 rounded-md">
                    {item.message}
                  </span>
                </div>
              );
            })}
        </section>
        {receiver ? (
          <div className=" flex gap-2">
            <input
              type="text"
              className=" w-full p-3 bg-black rounded-2xl "
              placeholder="Message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Chat;
