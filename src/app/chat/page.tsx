"use client";

import React, { useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMessage, { Message } from "@/components/chat/AIChatMessages";
import MessageInput from "@/components/chat/MessageInput";

const ChatPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      role: "assistant",
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    // Prepend the new user message
    setMessages((prev) => [newMessage, ...prev]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm an AI assistant. I'm here to help answer your questions.",
        role: "assistant",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [assistantMessage, ...prev]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        {/* Messages list: newest messages at bottom, flush above the input */}
        <div className="flex-1 flex flex-col-reverse overflow-y-auto p-4 pb-20">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        {/* Input bar lifted slightly above bottom */}
        <div className="border-t border-gray-200 p-4 sticky bottom-4 bg-white z-10">
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
