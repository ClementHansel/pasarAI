// src/components/floating/ChatWidget.tsx
"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import AIChatPanel from "@/components/chat/AIChatPanel";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button positioned at bottom-right */}
      <button
        onClick={() => setOpen(true)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition flex items-center justify-center z-50"
        aria-label="Open chat"
        title="Open chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat panel positioned below WhatsApp panel */}
      {open && (
        <div className="absolute bottom-6 right-0 w-[280px] bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
          <AIChatPanel fullPage={false} onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
