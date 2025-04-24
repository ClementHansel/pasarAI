"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import AIChatPanel from "@/components/chat/AIChatPanel";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      {open && <AIChatPanel fullPage={false} onClose={() => setOpen(false)} />}

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
          aria-label="Open chat"
          title="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
