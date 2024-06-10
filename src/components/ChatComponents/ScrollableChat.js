import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <img
                src={m.sender.pic}
                alt={m.sender.name}
                className="w-14 h-14 rounded-full"
              />

              
            )}
            <span
              className={`w-1/2 m-2 w-fit h-max text-xl ${
                m.sender._id === user._id
                  ? `bg-teal-600 text-white ml-96 `
                  : `bg-white text-black mr-36`
              } p-3 rounded text-black`}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
