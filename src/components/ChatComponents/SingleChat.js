import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";

const SingleChat = ({ fetchAgain, setfetchAgain }) => {
  const { user, selectedChat, setselectedChat } = ChatState();

  return (
    <div>
      {selectedChat ? (
        <div className="w-full text-xl md:text-2xl justify-between">
          {!selectedChat.isGroupChat ? (
            <div className="w-full h-full ">
              <div className="flex bg-blue-800">
                <div className="w-full  text-white font-bold rounded p-2">
                  {getSender(user, selectedChat.users)}
                </div>
                <div className="relative right-10 p-1">
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </div>
              </div>
              <div className="p-2 bg-neutral-300 w-full h-full overflow-y-scroll">messages</div>
            </div>
          ) : (
            <div>{selectedChat.chatName.toUpperCase()}</div>
          )}
        </div>
      ) : (
        <div className="font-bold text-xl md:text-3xl">No chat selected</div>
      )}
    </div>
  );
};

export default SingleChat;
