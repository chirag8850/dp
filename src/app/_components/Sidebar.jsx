"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  faBarsStaggered,
  faMessage,
  faQuestionCircle,
  faCog,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const MenuItem = ({ icon, label, collapsed }) => (
  <div className="flex items-center">
    <div className="w-7">
      <FontAwesomeIcon icon={icon} />
    </div>
    {!collapsed && <div className="ml-2 rounded-lg p-2">{label}</div>}
  </div>
);
const ChatConvo = ({ icon, label, collapsed, onClick }) => (
  <button className="flex items-center text-lg" onClick={onClick}>
    <div className="w-7">
      <FontAwesomeIcon icon={icon} />
    </div>
    {!collapsed && <div className="ml-2 rounded-lg p-1">{label}</div>}
  </button>
);

function Sidebar({ onChatClick, onNewChat, chatConvos }) {
  const [collapsed, setCollapsed] = useState(false);
  const [containerClassName, setContainerClassName] = useState(
    "flex flex-col w-[18%] h-screen bg-sidebar-background text-white z-10 overflow-hidden"
  );
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1250) {
        setCollapsed(true);
        setContainerClassName(
          "flex flex-col max-w-[60px] h-screen bg-sidebar-background text-white z-10 overflow-hidden"
        );
      } else {
        setCollapsed(false);
        setContainerClassName(
          "flex flex-col w-[18%] h-screen bg-sidebar-background text-white z-10 overflow-hidden"
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { icon: faQuestionCircle, label: "Help" },
    { icon: faCog, label: "Settings" },
  ];

  useEffect(() => {
    if (!collapsed && window.innerWidth <= 1250) {
      setContainerClassName(
        "flex flex-col w-screen min-h-screen bg-sidebar-background text-white z-10 overflow-x-scroll"
      );
    } else if (collapsed && window.innerWidth <= 1250) {
      setContainerClassName(
        "flex flex-col max-w-[60px] h-screen bg-sidebar-background text-white z-10 overflow-hidden"
      );
    } else if (collapsed) {
      setContainerClassName(
        "flex flex-col max-w-[60px] h-screen bg-sidebar-background text-white z-10 overflow-hidden"
      );
    } else {
      setContainerClassName(
        "flex flex-col w-[18%] h-screen bg-sidebar-background text-white z-10 overflow-hidden"
      );
    }
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={containerClassName}>
      {!collapsed ? (
        <div className="flex justify-between items-center p-4">
          <div
            className={`text-3xl cursor-pointer ${collapsed ? "ml-4" : ""}`}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBarsStaggered} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start p-4 gap-5">
          <div
            className="text-3xl cursor-pointer items-center justify-center"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBarsStaggered} />
          </div>
        </div>
      )}
      <div className="flex items-start h-20 justify-between p-2 border-t border-gray-700 overflow-hidden">
        <div className="flex items-start">
          <button
            className="flex min-w-10 h-10 overflow-hidden bg-gray-700 rounded-full dark:bg-gray-600 items-center justify-center p-5 "
            onClick={onNewChat}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            {!collapsed && <div className="ml-2">New Chat</div>}
          </button>
        </div>
      </div>
      {/* Chats */}

      <div className="flex flex-col flex-grow overflow-y-auto p-4 border-t border-gray-700 gap-3">
        {!collapsed && <div className="ml-2 rounded-lg p-1">Recent</div>}
        {chatConvos.map((item, index) => (
          <ChatConvo
            key={index}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            onClick={() => onChatClick(item)}
          />
        ))}
      </div>

      {/* Footer */}

      <div className="flex flex-col items-start text-lg p-4 border-t border-gray-700 gap-3">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}
      </div>

      {/* User Info */}

      <div className="flex items-start justify-between p-2 border-t border-gray-700">
        <div className="flex items-start">
          <div className="w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex items-center justify-center">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <span className="font-medium text-gray-600 dark:text-gray-300">
                KG
              </span>
            )}
          </div>

          {!collapsed && (
            <div className="ml-2 rounded-lg p-2 ">
              {isSignedIn ? (
                `${user.firstName} ${user.lastName} `
              ) : (
                <Link href={"/sign-in"}>
                  <Button className="bg-transparent text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white font-bold py-2 px-4 rounded">
                    Log In
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
