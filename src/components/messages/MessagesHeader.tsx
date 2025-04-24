"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";

type MessagesHeaderProps = {
  title: string;
  onBack?: () => void; // Optional: for mobile back button
  onOptionsClick?: () => void; // Optional: for dropdown or more options
};

export default function MessagesHeader({
  title,
  onBack,
  onOptionsClick,
}: MessagesHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1 text-gray-600 hover:text-black transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>

      {onOptionsClick && (
        <button
          onClick={onOptionsClick}
          className="p-1 text-gray-600 hover:text-black transition"
          aria-label="Options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
