import React from "react";
import { cn } from "@/lib/utils";

export interface AIChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  conversationId: string;
  accountId: string;
}

interface AIChatMessageProps {
  messages: AIChatMessage[];
}

const AIChatMessages = ({ messages }: AIChatMessageProps) => {
  return (
    <div className="space-y-4 px-4 py-6 sm:px-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex max-w-3xl mx-auto p-4 rounded-lg shadow-sm",
            message.role === "user" ? "bg-[#E5DEFF]/10" : "bg-white"
          )}
        >
          <div className="flex-shrink-0 mr-4">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center font-semibold",
                message.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-[#1A1F2C] text-white"
              )}
            >
              {message.role === "user" ? "U" : "A"}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {message.role === "user" ? "You" : "Assistant"}
            </p>
            <p className="mt-1 text-sm text-gray-700">{message.content}</p>
            <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIChatMessages;
