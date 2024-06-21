import React from "react";

const Message = ({ text, isSender, avatar }) => {
  return (
    <div
      className={`flex items-end ${
        isSender ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {!isSender && (
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3 border-2 border-black"
        />
      )}
      <div
        className={`max-w-xs md:max-w-md p-3 rounded-lg ${
          isSender ? "bg-blue-500 text-white" : "bg-gray-300 text-black "
        }`}
      >
        {text}
      </div>
      {isSender && (
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full ml-3 border-2 border-black"
        />
      )}
    </div>
  );
};

export default Message;
