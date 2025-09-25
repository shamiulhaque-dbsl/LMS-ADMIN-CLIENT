"use client";

import { useDropdown } from "@/hooks/useDropdown";
import { Dropdown } from "@/components/common/Dropdown";
import { Icons } from "@/components/Icons";
import Image from "next/image";

interface Message {
  id: number;
  name: string;
  message: string;
  avatar: string;
  time: string;
  isUnread: boolean;
}

interface MessageItemProps {
  name: string;
  message: string;
  avatar: string;
  time: string;
  isUnread: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ name, message, avatar, time, isUnread }) => (
  <a
    href="#"
    className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 
        ${isUnread ? "bg-gray-50 dark:bg-gray-700/50" : ""}`}
  >
    <div className="flex items-center">
      <Image src={avatar} alt={name} className="h-8 w-8 rounded-full mr-3" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{message}</p>
      </div>
      <div className="ml-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
        {isUnread && <span className="h-2 w-2 rounded-full bg-blue-600 mt-1 ml-auto" />}
      </div>
    </div>
  </a>
);

export const MessageDropdown: React.FC = () => {
  const { isOpen, toggle, close } = useDropdown();

  const messages: Message[] = [
    {
      id: 1,
      name: "John Doe",
      message: "Hey, can we meet tomorrow?",
      avatar: "/api/placeholder/32/32",
      time: "5m",
      isUnread: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "The project has been approved!",
      avatar: "/api/placeholder/32/32",
      time: "1h",
      isUnread: true,
    },
  ];

  const trigger = (
    <button
      onClick={toggle}
      className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
    >
      <Icons.message className="w-6 h-6" />
      {messages.some((m) => m.isUnread) && (
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
      )}
    </button>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={close}
      trigger={trigger}
      className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Messages</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <MessageItem key={message.id} {...message} />
        ))}
      </div>
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          View all messages
        </a>
      </div>
    </Dropdown>
  );
};
