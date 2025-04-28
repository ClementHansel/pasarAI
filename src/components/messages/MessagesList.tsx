"use client";

import { Conversation } from "@/types/message";
import { useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import Image from "next/image";

export type MessagesListProps = {
  conversations: Conversation[];
  onConversationSelect: (conversationId: number) => void;
  userRole: "admin" | "seller" | "buyer";
};

export default function MessagesList({
  conversations,
  onConversationSelect,
  userRole,
}: MessagesListProps) {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversation(conversationId);
    onConversationSelect(conversationId);
  };

  const formatLastActive = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isToday(date)) return format(date, "h:mm a");
      if (isYesterday(date)) return "Yesterday";
      return format(date, "MMM d");
    } catch {
      return "";
    }
  };

  return (
    <div className="bg-white">
      {/* Search box */}
      <div className="p-3 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full py-2 pl-9 pr-4 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 absolute left-2 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Conversations list */}
      <div className="overflow-y-auto">
        {conversations.map((conversation) => {
          const showUnread =
            (userRole === "buyer" && conversation.sender === "seller") ||
            (userRole === "seller" && conversation.sender === "buyer") ||
            conversation.sender === "admin";

          return (
            <div
              key={conversation.id}
              onClick={() => handleConversationSelect(conversation.id)}
              className={`flex items-center p-3 cursor-pointer border-b hover:bg-gray-50 transition ${
                selectedConversation === conversation.id ? "bg-blue-50" : ""
              }`}
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 mr-3 overflow-hidden">
                <Image
                  width={40}
                  height={40}
                  src={conversation.avatar ?? "https://via.placeholder.com/40"}
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Conversation details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-gray-900 truncate">
                    {conversation.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatLastActive(conversation.lastActive)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-600 truncate pr-2">
                    {conversation.lastMessage}
                  </p>
                  {showUnread && conversation.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>

                {/* Role-specific indicators */}
                {userRole === "seller" && conversation.sender === "buyer" && (
                  <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    Customer
                  </span>
                )}
                {userRole === "buyer" && conversation.sender === "seller" && (
                  <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Seller
                  </span>
                )}
                {conversation.sender === "admin" && (
                  <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                    Support
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
