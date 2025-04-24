"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

type MessageInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function MessageInput({
  onSend,
  disabled = false,
}: MessageInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t px-4 py-2 gap-2 bg-white"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="text-blue-600 hover:text-blue-800 transition disabled:opacity-50"
        aria-label="Send message"
        title="Send message"
      >
        <SendHorizontal className="w-5 h-5" />
      </button>
    </form>
  );
}
