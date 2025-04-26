import React from "react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

const AIChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 sm:px-6",
        message.role === "user" ? "bg-[#E5DEFF]/10" : "bg-white"
      )}
    >
      <div className="flex max-w-3xl mx-auto">
        <div className="flex-shrink-0 mr-4">
          <div
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center",
              message.role === "user"
                ? "bg-purple-600 text-white"
                : "bg-[#1A1F2C] text-white"
            )}
          >
            {message.role === "user" ? "U" : "A"}
          </div>
        </div>
        <div className="flex-1 gap-4">
          <p className="text-sm font-medium text-gray-900">
            {message.role === "user" ? "You" : "Assistant"}
          </p>
          <p className="mt-1 text-sm text-gray-700">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default AIChatMessage;
