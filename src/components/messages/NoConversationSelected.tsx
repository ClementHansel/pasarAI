"use client";

import { MessageCircle } from "lucide-react";

export default function NoConversationSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 text-gray-500">
      <MessageCircle className="w-10 h-10 mb-4 text-gray-400" />
      <h3 className="text-lg font-semibold mb-1">No Conversation Selected</h3>
      <p className="text-sm">
        Select a message from the list to view the conversation.
      </p>
    </div>
  );
}
