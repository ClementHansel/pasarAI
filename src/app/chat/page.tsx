// src/app/chat/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import MessageInput from "@/components/chat/ChatInput";
import AIChatMessages, {
  AIChatMessage,
} from "@/components/chat/AIChatMessages";

const ChatPage = () => {
  const { data: session, status } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Wait for session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const accountId = session?.user?.id;
  const accountRole = session?.user?.role;

  useEffect(() => {
    if (!accountId || !accountRole) return;

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
    if (!accountId || !accountRole) return;

    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date().toISOString(),
      accountId,
      conversationId: conversationId || "",
    };

    setMessages((prev) => [userMessage, ...prev]);

    try {
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

      setMessages((prev) => [data.message, ...prev]);
      const newConversationId = data.conversationId;
      if (newConversationId) setConversationId(newConversationId);

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

      const assistantRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: aiData.result,
          role: "assistant",
          accountId,
          accountRole,
          conversationId: newConversationId,
        }),
      });

      const assistantData = await assistantRes.json();
      if (!assistantRes.ok) {
        console.error("Failed to save assistant message", assistantData.error);
        return;
      }

      setMessages((prev) => [assistantData.message, ...prev]);
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
