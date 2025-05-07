// src/components/layout/homepage/AiAssistPromo.tsx
"use client";

import Link from "next/link";
import { MessageSquare, Sparkle } from "lucide-react";

export default function AiAssistPromo() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-2xl p-6 shadow-md mb-8">
      {/* Left content */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-full shadow-sm">
          <Sparkle className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            AI-Powered Shopping Assistant
          </h3>
          <p className="text-gray-600 text-sm">
            Ask our AI to find today’s most searched items, cheapest deals, or
            get personalized product recommendations.
          </p>
        </div>
      </div>
      {/* CTA Button */}
      <Link
        href="/chat"
        className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Chat with AI</span>
      </Link>
    </div>
  );
}
