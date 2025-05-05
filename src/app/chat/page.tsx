"use client";

import React, { useEffect, useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import MessageInput from "@/components/chat/ChatInput";
import AIChatMessages, {
  AIChatMessage,
} from "@/components/chat/AIChatMessages";

const ChatPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Assume account info comes from a secure source (auth/session)
  const accountId = "acc_123"; // Replace with real authenticated accountId
  const accountRole = "SELLER"; // Replace with real role from session

  // Fetch the latest conversation and messages on first load
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(
          `/api/chat?accountId=${accountId}&role=${accountRole}`
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const latest = data[0];
          setConversationId(latest.id);
          setMessages(latest.messages || []);
        } else {
          // Start with assistant message if no conversation yet
          setMessages([
            {
              id: "init",
              content: "Hello! How can I help you today?",
              role: "assistant",
              timestamp: new Date().toISOString(),
              conversationId: "",
              accountId,
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch conversations", err);
      }
    };

    fetchConversations();
  }, [accountId, accountRole]); // Add dependency to re-fetch if accountId or accountRole changes

  const handleSendMessage = async (content: string) => {
    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date().toISOString(),
      accountId,
      conversationId: conversationId ?? "",
    };

    // Optimistically show user message
    setMessages((prev) => [userMessage, ...prev]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          role: "user",
          accountId,
          conversationId,
          accountRole, // pass the account's true role
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const savedMessage = data.message;
        setConversationId(savedMessage.conversationId);

        // Simulated assistant reply after successful save
        const assistantMessage: AIChatMessage = {
          id: Date.now().toString() + "-a",
          content:
            "I'm an AI assistant. I'm here to help answer your questions.",
          role: "assistant",
          timestamp: new Date().toISOString(),
          accountId,
          conversationId: savedMessage.conversationId,
        };

        setTimeout(() => {
          setMessages((prev) => [assistantMessage, ...prev]);
        }, 1000);
      } else {
        console.error("Failed to send message", data.error);
      }
    } catch (err) {
      console.error("Message send error", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col-reverse overflow-y-auto p-4 pb-20">
          {messages.map((message) => (
            <AIChatMessages key={message.id} messages={[message]} />
          ))}
        </div>

        <div className="border-t border-gray-200 p-4 sticky bottom-4 bg-white z-10">
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
