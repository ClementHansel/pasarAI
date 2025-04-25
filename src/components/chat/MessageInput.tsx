"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./Button";

type MessageInputProps = {
  onSend: (text: string) => void;
};

export default function MessageInput({ onSend }: MessageInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 min-w-0 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none sm:text-sm sm:leading-6"
        />
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700"
          disabled={!input.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
