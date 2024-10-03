import axios from "axios";
import { useEffect, useState } from "react";

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

  const handleNewMessage = async () => {
    console.log({
      message: newMessage,
      sender: sender,
      receiver: receiver,
      seen: 0,
    });

    try {
      await instance.post("/addChat", {
        message: newMessage,
        sender: sender,
        receiver: receiver,
      });
      handleFetchChats();
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUsers = async () => {
    try {
      const response = await instance.get("/getAllUsers");
      console.log(response.data);
      setUsers(response.data);
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
  const handleFetchChats = async () => {
    try {
      const response = await instance.post("/fetchChats", {
        sender: sender,
        receiver: receiver,
      });
      setMessages(response.data);
      console.log(response.data, "-------------------------------chats");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUsers();
    handleMe();
    handleFetchChats();
  }, []);
  useEffect(() => {
    handleFetchChats();
  }, [sender, receiver, newMessage, users]);

  return (
    <div className=" w-full h-[calc(100vh-80px)] bg-gray-950 text-white flex">
      <main className=" w-[500px] bg-gray-900 h-full">
        {users.length > 0 &&
          users.map((item) => {
            return (
              item.userId !== sender && (
                <div
                  className={`w-full shadow-2xl flex gap-3 items-center p-4 ${
                    receiver === item.userId ? " bg-gray-600" : ""
                  }`}
                  key={item.userId}
                  onClick={() => setReceiver(item.userId)}
                >
                  <div className=" w-20 h-20 bg-white rounded-full"></div>
                  <h1 className="  font-bold text-xl">{item.username}</h1>
                </div>
              )
            );
          })}
      </main>
      <main className=" flex flex-col justify-between w-full p-4">
        <section className=" w-full h-full">
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
        <input
          type="text"
          className=" w-full p-3 bg-black rounded-2xl"
          placeholder="Message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleNewMessage();
          }}
        />
      </main>
    </div>
  );
};

export default Chat;
