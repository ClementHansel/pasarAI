import MessageBubble from "./MessageBubble";

export type ChatMessage = {
  id: number;
  sender: "ai" | "user";
  text: string;
};

type AIChatMessagesProps = {
  messages: ChatMessage[];
};

export default function AIChatMessages({ messages }: AIChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
}
