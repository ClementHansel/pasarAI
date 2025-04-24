// src/app/message/page.tsx

"use client";

import { useState } from "react";
import MessagesList from "../../components/messages/MessagesList";
import MessageThread from "../../components/messages/MessageThread";
import { Conversation, Message } from "../../types/message"; // Import the types

// Sample data for conversations and messages
const conversations: Conversation[] = [
  {
    id: 1,
    title: "Conversation with Seller A",
    lastMessage: "Looking forward to our deal!",
    sender: "buyer",
  },
  {
    id: 2,
    title: "Conversation with Seller B",
    lastMessage: "Let me know if you have any questions.",
    sender: "seller",
  },
  {
    id: 3,
    title: "Conversation with Admin",
    lastMessage: "Your account has been approved!",
    sender: "admin",
  },
];

const allMessages: Message[] = [
  {
    id: 1,
    conversationId: 1, // Add conversationId to each message
    sender: "buyer",
    text: "Hello, I have some questions about the product.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    conversationId: 1,
    sender: "seller",
    text: "Sure! What would you like to know?",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    conversationId: 2,
    sender: "buyer",
    text: "I’m interested in your product, can you provide more details?",
    timestamp: new Date().toISOString(),
  },
  {
    id: 4,
    conversationId: 2,
    sender: "seller",
    text: "Of course! Here are the details.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 5,
    conversationId: 3,
    sender: "admin",
    text: "Your account has been approved!",
    timestamp: new Date().toISOString(),
  },
];

export default function MessagePage() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  // Define currentUserId (this can be dynamically fetched from context or session)
  const currentUserId = "buyer"; // Example: hardcoded, should be dynamic in real case

  // Filter messages based on selected conversation
  const filteredMessages = selectedConversationId
    ? allMessages.filter(
        (message) => message.conversationId === selectedConversationId
      )
    : [];

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversationId(conversationId);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Messages List */}
      <MessagesList
        conversations={conversations}
        onConversationSelect={handleConversationSelect}
      />

      {/* Right Side - Message Thread */}
      <div className="flex-1 p-4">
        {selectedConversationId ? (
          <MessageThread
            conversationId={selectedConversationId}
            messages={filteredMessages} // Pass filtered messages here
            currentUserId={currentUserId} // Pass currentUserId to MessageThread
          />
        ) : (
          <div className="text-gray-500">
            Select a conversation to view messages.
          </div>
        )}
      </div>
    </div>
  );
}
