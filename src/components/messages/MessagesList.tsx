"use client";

import { Conversation } from "@/types/message";
import { useState } from "react";

type MessagesListProps = {
  conversations: Conversation[];
  onConversationSelect: (conversationId: number) => void;
};

export default function MessagesList({
  conversations,
  onConversationSelect,
}: MessagesListProps) {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversation(conversationId);
    onConversationSelect(conversationId);
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
      <h2 className="font-semibold text-lg mb-4">Messages</h2>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleConversationSelect(conversation.id)}
            className={`cursor-pointer p-4 rounded-lg hover:bg-gray-100 ${
              selectedConversation === conversation.id ? "bg-blue-100" : ""
            }`}
          >
            <h3 className="font-medium text-sm text-gray-700">
              {conversation.title}
            </h3>
            <p className="text-xs text-gray-500">{conversation.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
