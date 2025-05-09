"use client";

import { useState, useEffect, useRef } from "react";
import AIChatHeader from "./AIChatHeader";
import ChatInput from "./ChatInput";
import AIChatMessages, { AIChatMessage } from "./AIChatMessages";
import { useSession } from "next-auth/react";

interface AIChatPanelProps {
  fullPage?: boolean;
  onClose: () => void;
}

export default function AIChatPanel({
  fullPage = false,
  onClose,
}: AIChatPanelProps) {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status !== "authenticated" || !session) return;

    const accountId = session?.user?.id;
    const accountRole = session?.user?.role;
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
  }, [status, session]);

  const handleSendMessage = async (content: string) => {
    if (status !== "authenticated" || !session) return;

    const accountId = session.user?.id;
    const accountRole = session.user?.role;

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

    setLoading(true); // Set loading to true when sending a message

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
        setLoading(false); // Set loading to false on error
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
        setLoading(false); // Set loading to false on error
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
        setLoading(false); // Set loading to false on error
        return;
      }

      setMessages((prev) => [assistantData.message, ...prev]);
      setLoading(false); // Set loading to false when done
    } catch (err) {
      console.error("Message send error", err);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={`flex flex-col ${fullPage ? "h-screen" : "h-full"}`}>
      <AIChatHeader onClose={onClose} />

      <div className="flex flex-col flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Start a conversation with AI
          </div>
        ) : (
          <AIChatMessages messages={messages} />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <ChatInput onSend={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}
