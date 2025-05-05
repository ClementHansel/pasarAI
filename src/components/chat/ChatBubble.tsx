type MessageBubbleProps = {
  sender: "ai" | "user";
  text: string;
};

export default function ChatBubble({ sender, text }: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
      aria-live="polite" // Useful for accessibility, especially if this updates dynamically
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-md break-words ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
