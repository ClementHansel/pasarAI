// src/components/floating/WhatsAppWidget.tsx
"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const phoneNumber = "628123456789"; // Replace with your number (with country code)

  return (
    <div className="relative">
      {/* Button positioned at bottom-right */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition flex items-center justify-center z-50"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {open && (
        <div className="absolute bottom-20 right-0 w-[280px] bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 transform">
          <div className="font-semibold text-gray-800 mb-2">Need Help?</div>
          <p className="text-sm text-gray-600 mb-3">Chat us on WhatsApp.</p>
          <Link
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition"
          >
            Start Chat
          </Link>
        </div>
      )}
    </div>
  );
}
