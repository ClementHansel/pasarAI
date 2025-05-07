"use client";

import { Conversation } from "@/types/message";
import { useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import Image from "next/image";

export type MessagesListProps = {
  conversations: Conversation[];
  onConversationSelect: (conversationId: number) => void;
  userRole: "admin" | "seller" | "buyer";
  onDeleteConversation: (id: number) => Promise<void>;
  onDeleteMultiple: (ids: number[]) => Promise<void>;
};

export default function MessagesList({
  conversations,
  onConversationSelect,
  userRole,
  onDeleteConversation,
  onDeleteMultiple,
}: MessagesListProps) {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForDeletion, setSelectedForDeletion] = useState<number[]>([]);

  const handleConversationSelect = (conversationId: number) => {
    if (conversationId !== selectedConversation) {
      setSelectedConversation(conversationId);
      onConversationSelect(conversationId);
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedForDeletion((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedForDeletion.length > 0) {
      try {
        await onDeleteMultiple(selectedForDeletion);
        setSelectedForDeletion([]);
      } catch (error) {
        console.error("Error deleting selected conversations", error);
      }
    }
  };

  const handleDeleteSingle = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    try {
      await onDeleteConversation(id);
    } catch (error) {
      console.error("Error deleting conversation", error);
    }
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

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white">
      {/* Search Box */}
      <div className="p-3 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Action bar for multi-delete */}
      {selectedForDeletion.length > 0 && (
        <div className="flex justify-between items-center px-4 py-2 bg-red-50 border-b">
          <span className="text-sm text-red-700">
            {selectedForDeletion.length} selected
          </span>
          <button
            onClick={handleDeleteSelected}
            className="text-sm text-red-600 hover:underline"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Conversations List */}
      <div className="overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const showUnread =
            (userRole === "buyer" && conversation.senderRole === "seller") ||
            (userRole === "seller" && conversation.senderRole === "buyer") ||
            conversation.senderRole === "admin";

          const isSelected = selectedForDeletion.includes(conversation.id);

          return (
            <div
              key={conversation.id}
              onClick={() => handleConversationSelect(conversation.id)}
              className={`relative flex items-center p-3 cursor-pointer border-b hover:bg-gray-50 transition ${
                selectedConversation === conversation.id ? "bg-blue-50" : ""
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelection(conversation.id)}
                className="absolute left-3 top-5 z-10"
                aria-label="checkbox"
              />

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 mr-3 ml-6 overflow-hidden">
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
                    {conversation.title ?? "Untitled"}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatLastActive(conversation.lastActive)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-600 truncate pr-2">
                    {conversation.lastMessage ?? "No messages yet"}
                  </p>
                  {showUnread && conversation.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>

                {/* Role labels */}
                {userRole === "seller" &&
                  conversation.senderRole === "buyer" && (
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Customer
                    </span>
                  )}
                {userRole === "buyer" &&
                  conversation.senderRole === "seller" && (
                    <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      Seller
                    </span>
                  )}
                {conversation.senderRole === "admin" && (
                  <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                    Support
                  </span>
                )}
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => handleDeleteSingle(e, conversation.id)}
                className="ml-2 text-red-500 text-xs hover:underline"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
