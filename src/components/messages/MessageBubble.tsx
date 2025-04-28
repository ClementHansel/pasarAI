"use client";

import clsx from "clsx";
import { Check } from "lucide-react";

export type MessageBubbleProps = {
  senderId: string;
  sender: "admin" | "seller" | "buyer";
  currentUserId: string;
  text: string;
  timestamp: string;
};

export default function MessageBubble({
  senderId,
  sender,
  currentUserId,
  text,
  timestamp,
}: MessageBubbleProps) {
  const isSender = senderId === currentUserId;

  const getBubbleStyles = () => {
    if (isSender) {
      return "bg-blue-600 text-white rounded-br-none";
    } else if (sender === "admin") {
      return "bg-purple-100 text-purple-800 rounded-bl-none";
    } else if (sender === "seller") {
      return "bg-green-100 text-green-800 rounded-bl-none";
    } else {
      return "bg-gray-200 text-gray-800 rounded-bl-none";
    }
  };

  return (
    <div
      className={clsx(
        "flex w-full",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow-sm mb-2",
          getBubbleStyles()
        )}
      >
        <p className="whitespace-pre-wrap break-words">{text}</p>
        <div
          className={clsx(
            "text-xs mt-1 flex items-center justify-end",
            isSender ? "text-blue-200" : "text-gray-400"
          )}
        >
          <span>{timestamp}</span>
          {isSender && (
            <div className="flex items-center ml-1 gap-[-2px]">
              <Check className="w-4 h-4" />
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
