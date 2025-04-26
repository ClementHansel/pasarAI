// src/types/message.ts

export type Message = {
  id: number;
  conversationId: number;
  sender: "admin" | "seller" | "buyer";
  text: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
};

export type Conversation = {
  id: number;
  title: string;
  lastMessage: string;
  sender: "admin" | "seller" | "buyer";
  avatar?: string;
  unreadCount: number;
  lastActive: string;
  status?: "online" | "offline" | "away";
};
