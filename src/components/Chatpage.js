import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import Sidedrawer from "./ChatComponents/SideDrawer";
import MyChats from "./ChatComponents/MyChats";
import ChatBox from "./ChatComponents/ChatBox";
const ChatPage = () => {
  const { user } = ChatState();
  const [chats, setChats] = useState([]);
const [fetchAgain,setfetchAgain]=useState(false)
  return (
    <div className="border shadow-lg bg-white m-10 flex p-10 rounded-2xl w-lvw h-lvh ">
      <div className="w-1/3 border-r-4 bg-blue-300 rounded p-2 ">
        <div className=""><h3 className="p-2 font-bold text-3xl blue">Your chats</h3>{user && <Sidedrawer />}</div>
        <div>{user && <MyChats fetchAgain={fetchAgain} />}</div>
      </div>
      <div className="w-full h-full ">
        {user && (
          <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
