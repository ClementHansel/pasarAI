"use client";

import { MessageCircle } from "lucide-react";

export default function NoConversationSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 text-gray-500 bg-gray-50">
      <div className="p-6 bg-white rounded-lg shadow-sm max-w-md">
        <MessageCircle className="w-12 h-12 mb-4 text-blue-400 mx-auto" />
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          No Conversation Selected
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Select a message from the list to view the conversation or start a new
          chat.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Start New Chat
        </button>
      </div>
    </div>
  );
}
