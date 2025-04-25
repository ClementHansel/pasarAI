"use client";

import { useState, useRef } from "react";
import { SendHorizontal, Paperclip, Smile, Mic } from "lucide-react";

type MessageInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function MessageInput({
  onSend,
  disabled = false,
}: MessageInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  const handleAttachmentClick = () => {
    // In a real app, this would open file picker
    console.log("Attachment clicked");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t px-4 py-3 gap-2 bg-white"
    >
      <button
        type="button"
        onClick={handleAttachmentClick}
        className="text-gray-500 hover:text-blue-600 transition"
        aria-label="Attach file"
      >
        <Paperclip className="w-5 h-5" />
      </button>

      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="w-full px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-gray-500 hover:text-blue-600 transition"
          aria-label="Add emoji"
        >
          <Smile className="w-5 h-5" />
        </button>
      </div>

      {value.trim() ? (
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition disabled:opacity-50 flex-shrink-0"
          aria-label="Send message"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="button"
          className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition disabled:opacity-50 flex-shrink-0"
          aria-label="Voice message"
        >
          <Mic className="w-5 h-5" />
        </button>
      )}
    </form>
  );
}
