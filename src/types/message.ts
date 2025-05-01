// src/types/message.ts

export type Message = {
  id: number;
  conversationId: number;
  senderRole: "admin" | "seller" | "buyer"; // Added senderRole property
  text: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
};

export type Conversation = {
  id: number;
  title: string;
  lastMessage: string;
  senderRole: "admin" | "seller" | "buyer";
  avatar?: string;
  unreadCount: number;
  lastActive: string;
  status?: "online" | "offline" | "away";
};
