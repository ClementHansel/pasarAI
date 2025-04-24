// src/types/message.ts

// Define the possible roles for sender
export type Sender = "buyer" | "seller" | "admin";

// Define the Message type
export type Message = {
  id: number;
  conversationId: number;
  sender: Sender;
  text: string;
  timestamp: string;
};

// Define the Conversation type
export type Conversation = {
  id: number;
  title: string;
  lastMessage: string;
  sender: Sender;
};
