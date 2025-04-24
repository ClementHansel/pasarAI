"use client";

import { useState } from "react";
import type { ChatMessage } from "./AIChatMessages";
import AIChatMessages from "./AIChatMessages";
import MessageInput from "./MessageInput";
import AIChatHeader from "./AIChatHeader";
import { cn } from "@/lib/utils";

type AIChatPanelProps = {
  fullPage?: boolean;
  onClose?: () => void;
};

const mockMessages: ChatMessage[] = [
  { id: 1, sender: "ai", text: "Hello! How can I help you today?" },
  { id: 2, sender: "user", text: "Tell me about your platform." },
];

export default function AIChatPanel({
  fullPage = false,
  onClose,
}: AIChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [typing, setTyping] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, newMessage]);

    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Thanks for your message!",
        },
      ]);
      setTyping(false);
    }, 1000);
  };

  return (
    <div
      className={cn(
        fullPage
          ? "w-full max-w-3xl h-[calc(100vh-4rem)] mx-auto mt-4"
          : "fixed bottom-20 right-6 w-[340px] max-h-[500px] z-50",
        "bg-white rounded-xl shadow-lg border flex flex-col overflow-hidden"
      )}
    >
      <AIChatHeader
        onClose={onClose ?? (() => {})}
        status={typing ? "typing" : "online"}
      />

      <AIChatMessages messages={messages} />

      <div className="p-2 border-t">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
