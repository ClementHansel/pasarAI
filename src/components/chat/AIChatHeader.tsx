"use client";

import { X } from "lucide-react";

type Status = "online" | "typing" | "offline";

type AIChatHeaderProps = {
  title?: string;
  onClose: () => void;
  status?: Status;
};

export default function AIChatHeader({
  title = "AI Assistant",
  onClose,
  status = "online",
}: AIChatHeaderProps) {
  const statusText = {
    online: "Online",
    typing: "Typing...",
    offline: "Offline",
  };

  const statusColor = {
    online: "bg-green-400",
    typing: "bg-yellow-400",
    offline: "bg-gray-400",
  };

  return (
    <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${statusColor[status]}`} />
        <div>
          <h3 className="text-sm font-semibold leading-none">{title}</h3>
          <p className="text-xs">{statusText[status]}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="hover:text-gray-200 transition"
        title="Close chat"
        aria-label="Close chat"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
