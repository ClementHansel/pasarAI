"use client";

import { useState, useEffect, useRef } from "react";
import AIChatHeader from "./AIChatHeader";
import AIChatMessages, { Message as ChatMessage } from "./AIChatMessages";
import MessageInput from "./MessageInput";

export default function AIChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    const timestamp = Date.now();
    const userMsg: ChatMessage = {
      id: timestamp.toString(),
      content: text,
      role: "user",
      timestamp: new Date(timestamp).toISOString(),
    };
    const aiMsg: ChatMessage = {
      id: (timestamp + 1).toString(),
      content: `Echo: ${text}`,
      role: "assistant",
      timestamp: new Date(timestamp + 1).toISOString(),
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <AIChatHeader onClose={() => {}} />

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
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
