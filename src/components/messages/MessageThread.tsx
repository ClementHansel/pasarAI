"use client";

import { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types/message";

// Placeholder for the user role, you can fetch this from your global state or API
const getUserRole = () => {
  // This could be replaced by actual logic to get the user's role (from context, session, etc.)
  // Example: fetching from context or API
  return "buyer"; // or "seller", "user" depending on the logged-in account
};

type MessageThreadProps = {
  conversationId: number;
  messages: Message[];
  currentUserId: string;
};

export default function MessageThread({
  conversationId,
  messages,
  currentUserId,
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("");
  const [sender, setSender] = useState<"admin" | "seller" | "buyer">("buyer"); // Default sender is "buyer"

  // Set the sender role based on the logged-in user's role
  useEffect(() => {
    const userRole = getUserRole(); // Fetch or get the user role from context, API, or session
    setSender(userRole as "admin" | "seller" | "buyer"); // Set sender based on user role
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now(),
        conversationId,
        sender,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      // Here you can handle sending the message to the backend or updating the state
      console.log("New message:", newMsg);
      setNewMessage(""); // Clear input field after sending
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-lg border">
      {/* Message thread header */}
      <div className="px-4 py-2 border-b flex justify-between items-center bg-gray-100">
        <h3 className="font-semibold text-lg">
          Conversation #{conversationId}
        </h3>
      </div>

      {/* Messages List */}
      <div className="overflow-y-auto flex-grow p-4 space-y-3">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            sender={message.sender}
            senderId={message.sender} // Assuming senderId corresponds to the sender's role
            currentUserId={currentUserId} // Pass the current user's ID
            text={message.text}
            timestamp={message.timestamp} // Pass the timestamp as well
          />
        ))}
      </div>

      {/* New Message Input */}
      <div className="border-t p-4 bg-gray-50">
        <div className="flex items-center">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={2}
            className="w-full p-2 border rounded-lg resize-none"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
