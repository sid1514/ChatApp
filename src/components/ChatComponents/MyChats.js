import { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "../GroupChat/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const { user, setselectedChat, chat, setChats, selectedChat } = ChatState();
  const [loggedUser, setloggedUser] = useState();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      console.log(data);
      setChats(data);
    } catch (error) {
      console.log("unable to fetch Messages");
    }
  };

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <>
      <div className="w-full">
        <div className="text-right">
          <GroupChatModal />
        </div>

        <div className="flex flex-col overflow-y-hidden">
          {chat ? (
            <div className="overflow-y-scroll">
              {chat.map((chat) => (
                <div
                  onClick={() => setselectedChat(chat)}
                  cursor="pointer"
                  className={
                    selectedChat === chat
                      ? "border text-white bg-neutral-800 p-2 rounded"
                      : "rounded border text-black bg-white p-2 m-2 shadow-lg"
                  }
                  key={chat._id}
                >
                  <p>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
    </>
  );
};

export default MyChats;
