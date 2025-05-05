"use client";

import { useState, useEffect, useRef } from "react";
import AIChatHeader from "./AIChatHeader";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid"; // Install with: npm install uuid
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
  const [conversationId] = useState<string>(() => uuidv4()); // Generate once
  const userAccountId = "user-12345"; // Replace with real account ID
  const assistantAccountId = "assistant-system"; // Static or AI model ID
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    const timestamp = Date.now();

    const userMsg: AIChatMessage = {
      id: timestamp.toString(),
      content: text,
      role: "user",
      timestamp: new Date(timestamp).toISOString(),
      conversationId,
      accountId: userAccountId,
    };

    const aiMsg: AIChatMessage = {
      id: (timestamp + 1).toString(),
      content: `Echo: ${text}`,
      role: "assistant",
      timestamp: new Date(timestamp + 1).toISOString(),
      conversationId,
      accountId: assistantAccountId,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
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
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
