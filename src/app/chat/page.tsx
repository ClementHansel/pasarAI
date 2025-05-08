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
          setConversationId(latest.id); // Set conversationId from existing conversation
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
  }, [accountId, accountRole]);

  const handleSendMessage = async (content: string) => {
    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date().toISOString(),
      accountId,
      conversationId: conversationId || "", // Use the conversationId
    };

    // Optimistically show user message
    setMessages((prev) => [userMessage, ...prev]);

    try {
      // Step 1: Save user message to database
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          role: "user",
          accountId,
          accountRole,
          conversationId: conversationId || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to send message", data.error);
        return;
      }

      const savedUserMessage: AIChatMessage = {
        ...data.message,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [savedUserMessage, ...prev]);

      // Update conversationId if it's newly created
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      const newConversationId = data.conversationId;

      // Step 2: Call the AI response API with the user's message
      const aiRes = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      });

      const aiData = await aiRes.json();

      if (!aiRes.ok || !aiData.result) {
        console.error("AI response failed", aiData.error);
        return;
      }

      const aiResponse = aiData.result;

      // Step 3: Save the AI message to DB
      const assistantRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: aiResponse,
          role: "assistant",
          accountId,
          accountRole,
          conversationId: newConversationId, // Make sure the new conversationId is used
        }),
      });

      const assistantData = await assistantRes.json();

      if (!assistantRes.ok) {
        console.error("Failed to save assistant message", assistantData.error);
        return;
      }

      const savedAssistantMessage: AIChatMessage = {
        ...assistantData.message,
        timestamp: new Date().toISOString(),
      };

      // Step 4: Show assistant message in UI
      setMessages((prev) => [savedAssistantMessage, ...prev]);
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
