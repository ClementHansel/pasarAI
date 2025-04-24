"use client";

import clsx from "clsx";

export type MessageBubbleProps = {
  senderId: string;
  sender: "admin" | "seller" | "buyer";
  currentUserId: string;
  text: string;
  timestamp: string;
};

export default function MessageBubble({
  senderId,
  currentUserId,
  text,
  timestamp,
}: MessageBubbleProps) {
  const isSender = senderId === currentUserId;

  return (
    <div
      className={clsx(
        "flex w-full",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-xs px-4 py-2 rounded-lg text-sm shadow-md mb-2",
          isSender
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        )}
      >
        <p>{text}</p>
        {timestamp && (
          <div className="text-xs text-gray-400 mt-1 text-right">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
}
