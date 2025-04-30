"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import MessagesHeader from "./MessagesHeader";
import { Message } from "@/types/message";
import { format } from "date-fns";

type MessageThreadProps = {
  conversationId: number;
  messages: Message[];
  currentUserId: string;
  userRole: "admin" | "seller" | "buyer";
  conversationTitle: string;
  onSendMessage: (message: string) => void;
  onBack?: () => void;
};

export default function MessageThread({
  messages,
  currentUserId,
  conversationTitle,
  onSendMessage,
  onBack,
}: MessageThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format timestamp to display
  const formatTime = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "h:mm a");
    } catch {
      return "";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border overflow-hidden">
      {/* Message thread header */}
      <MessagesHeader
        title={conversationTitle}
        onBack={onBack}
        onOptionsClick={() => console.log("Options clicked")}
      />

      {/* Messages List */}
      <div className="overflow-y-auto flex-grow p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            senderId={message.senderRole}
            senderRole={message.senderRole}
            currentUserId={currentUserId}
            text={message.text}
            timestamp={formatTime(message.timestamp)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* New Message Input */}
      <MessageInput onSend={onSendMessage} disabled={false} />
    </div>
  );
}
