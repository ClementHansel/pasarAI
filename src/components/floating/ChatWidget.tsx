"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
        aria-label="Open chat"
        title="Open chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Panel (placeholder for now) */}
      {open && (
        <div className="absolute bottom-16 right-0 w-[320px] h-[400px] bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
          <div className="font-bold text-gray-800 mb-2">Chat AI</div>
          <div className="text-sm text-gray-500">(Chat UI coming soon...)</div>
        </div>
      )}
    </div>
  );
}
