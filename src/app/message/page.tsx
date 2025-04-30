// src/app/message/page.tsx

"use client";

import { useState } from "react";
import MessagesList from "../../components/messages/MessagesList";
import MessageThread from "../../components/messages/MessageThread";
import NoConversationSelected from "../../components/messages/NoConversationSelected";
import { Conversation, Message } from "../../types/message";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Sample data for conversations and messages
const conversations: Conversation[] = [
  {
    id: 1,
    title: "Conversation with John Doe",
    lastMessage: "Looking forward to our deal!",
    senderRole: "buyer",
    avatar: "/api/placeholder/40/40", // Placeholder avatar
    unreadCount: 2,
    lastActive: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Conversation with Jane Smith",
    lastMessage: "Let me know if you have any questions.",
    senderRole: "seller",
    avatar: "/api/placeholder/40/40", // Placeholder avatar
    unreadCount: 0,
    lastActive: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Marketplace Support",
    lastMessage: "Your account has been approved!",
    senderRole: "admin",
    avatar: "/api/placeholder/40/40", // Placeholder avatar
    unreadCount: 1,
    lastActive: new Date().toISOString(),
  },
];

const allMessages: Message[] = [
  {
    id: 1,
    conversationId: 1,
    senderRole: "buyer",
    text: "Hello, I have some questions about the product.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: 2,
    conversationId: 1,
    senderRole: "seller",
    text: "Sure! What would you like to know?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: 3,
    conversationId: 2,
    senderRole: "buyer",
    text: "I'm interested in your product, can you provide more details?",
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 minutes ago
  },
  {
    id: 4,
    conversationId: 2,
    senderRole: "seller",
    text: "Of course! Here are the details: The product is brand new and comes with a 1-year warranty. It's available in 3 colors.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
  },
  {
    id: 5,
    conversationId: 3,
    senderRole: "admin",
    text: "Your account has been approved! Welcome to our marketplace.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
];

export default function MessagePage() {
  // State management
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [messages, setMessages] = useState<Message[]>(allMessages);
  const [userRole, setUserRole] = useState<"admin" | "seller" | "buyer">(
    "buyer"
  );
  const [showMessageList, setShowMessageList] = useState(true);

  // Check if it's a mobile view
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle conversation selection
  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversationId(conversationId);
    if (isMobile) {
      setShowMessageList(false);
    }
  };

  // Handle back button for mobile
  const handleBack = () => {
    setShowMessageList(true);
    if (!isMobile) {
      setSelectedConversationId(null);
    }
  };

  // Handle role toggle (for demo purposes)
  const toggleRole = () => {
    setUserRole(userRole === "buyer" ? "seller" : "buyer");
  };

  // Handle sending a new message
  const handleSendMessage = (text: string) => {
    if (selectedConversationId) {
      const newMessage: Message = {
        id: Math.max(...messages.map((m) => m.id)) + 1,
        conversationId: selectedConversationId,
        senderRole: userRole,
        text,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);
    }
  };

  // Filter messages based on selected conversation
  const filteredMessages = selectedConversationId
    ? messages.filter(
        (message) => message.conversationId === selectedConversationId
      )
    : [];

  // Get selected conversation details
  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar with role toggle */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Messages</h1>
        <button
          onClick={toggleRole}
          className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          {userRole === "buyer" ? "Switch to Seller" : "Switch to Buyer"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Messages List (hidden on mobile when conversation is selected) */}
        {(!isMobile || showMessageList) && (
          <div
            className={`${
              isMobile ? "w-full" : "w-80"
            } border-r border-gray-200 overflow-hidden flex flex-col`}
          >
            <div className="p-4 bg-gray-800 text-white">
              <h2 className="font-semibold">
                {userRole === "buyer" ? "My Purchases" : "My Shop Messages"}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <MessagesList
                conversations={conversations}
                onConversationSelect={handleConversationSelect}
                userRole={userRole}
              />
            </div>
          </div>
        )}

        {/* Message Thread (full width on mobile when conversation is selected) */}
        <div
          className={`flex-1 ${
            !isMobile || !showMessageList ? "block" : "hidden"
          }`}
        >
          {selectedConversationId && selectedConversation ? (
            <MessageThread
              conversationId={selectedConversationId}
              messages={filteredMessages}
              currentUserId={userRole}
              userRole={userRole}
              conversationTitle={selectedConversation.title}
              onSendMessage={handleSendMessage}
              onBack={isMobile ? handleBack : undefined}
            />
          ) : (
            <NoConversationSelected />
          )}
        </div>
      </div>
    </div>
  );
}
