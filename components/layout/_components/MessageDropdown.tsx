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
      <Image src={avatar} alt={name} className="mr-3 h-8 w-8 rounded-full" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{name}</p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{message}</p>
      </div>
      <div className="ml-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
        {isUnread && <span className="ml-auto mt-1 h-2 w-2 rounded-full bg-blue-600" />}
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
      className="relative text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-white"
    >
      <Icons.message className="h-6 w-6" />
      {messages.some((m) => m.isUnread) && (
        <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      )}
    </button>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={close}
      trigger={trigger}
      className="w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800"
    >
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Messages</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <MessageItem key={message.id} {...message} />
        ))}
      </div>
      <div className="border-t border-gray-200 px-4 py-2 dark:border-gray-600">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          View all messages
        </a>
      </div>
    </Dropdown>
  );
};
