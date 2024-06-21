"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../_components/Sidebar";
import Ai from "../_components/Ai";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { app, firestore } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function Services() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatConvos, setChatConvos] = useState([]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const addNewChat = () => {
    const newChat = {
      icon: faMessage,
      label: `New Chat ${chatConvos.length + 1}`,
    };
    setChatConvos([...chatConvos, newChat]);
    setSelectedChat(newChat);
  };

  return (
    <div className="flex w-screen h-screen flex-row">
      <Sidebar
        onChatClick={handleChatClick}
        onNewChat={addNewChat}
        chatConvos={chatConvos}
      />
      <Ai selectedChat={selectedChat} onNewChat={addNewChat} />
    </div>
  );
}

export default Services;
