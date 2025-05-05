"use client";

import { useState, useEffect, useRef } from "react";
import AIChatHeader from "./AIChatHeader";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import AIChatMessages, { AIChatMessage } from "./AIChatMessages";

interface AIChatPanelProps {
  fullPage?: boolean;
  onClose: () => void;
}

export default function AIChatPanel({
  fullPage = false,
  onClose,
}: AIChatPanelProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [conversationId] = useState<string>(() => uuidv4());
  const [loading, setLoading] = useState(false);
  const userAccountId = "user-12345";
  const assistantAccountId = "assistant-system";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (text: string) => {
    const timestamp = Date.now();

    const userMsg: AIChatMessage = {
      id: timestamp.toString(),
      content: text,
      role: "user",
      timestamp: new Date(timestamp).toISOString(),
      conversationId,
      accountId: userAccountId,
    };

    // Immediately show user message
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Step 1: Save the user message to the chat API (this could be to store it in the database)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, message: text }),
      });

      const data = await res.json();

      if (res.ok && data?.message) {
        // Step 2: Send the user message to the AI and get a response
        const aiRes = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: text }),
        });

        const aiData = await aiRes.json();

        if (aiRes.ok && aiData?.result) {
          // Step 3: Show the AI response message
          const aiMsg: AIChatMessage = {
            id: (timestamp + 1).toString(),
            content: aiData.result, // AI's reply
            role: "assistant",
            timestamp: new Date(timestamp + 1).toISOString(),
            conversationId,
            accountId: assistantAccountId,
          };

          setMessages((prev) => [...prev, aiMsg]);
        } else {
          // AI failed to generate a response
          setMessages((prev) => [
            ...prev,
            {
              id: (timestamp + 2).toString(),
              content: "⚠️ Failed to get response from AI.",
              role: "assistant",
              timestamp: new Date(timestamp + 2).toISOString(),
              conversationId,
              accountId: assistantAccountId,
            },
          ]);
        }
      } else {
        // Failed to save the user message
        setMessages((prev) => [
          ...prev,
          {
            id: (timestamp + 2).toString(),
            content: "⚠️ Failed to save message.",
            role: "assistant",
            timestamp: new Date(timestamp + 2).toISOString(),
            conversationId,
            accountId: assistantAccountId,
          },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (timestamp + 3).toString(),
          content: "⚠️ Network or server error.",
          role: "assistant",
          timestamp: new Date(timestamp + 3).toISOString(),
          conversationId,
          accountId: assistantAccountId,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
