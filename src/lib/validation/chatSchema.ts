// lib/validation/chatSchema.ts
import { z } from "zod";

export const ChatMessageSchema = z.object({
  content: z.string().min(1),
  role: z.enum(["user", "assistant"]),
  accountId: z.string(),
  conversationId: z.string().optional(),
  accountRole: z.enum(["BUYER", "SELLER", "ADMIN"]),
});
