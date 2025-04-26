import { z } from "zod";

export const GetMessagesSchema = z.object({
  accountId: z.string().uuid({ message: "Invalid accountId format" }),
  search: z.string().optional(),
});

export const SendMessageSchema = z.object({
  senderId: z.string().uuid({ message: "Invalid senderId format" }),
  receiverId: z.string().uuid({ message: "Invalid receiverId format" }),
  content: z.string().min(1, { message: "Content cannot be empty" }),
});

export const MarkAsReadSchema = z.object({
  accountId: z.string().uuid({ message: "Invalid accountId format" }),
  conversationId: z.string().uuid({ message: "Invalid conversationId format" }),
});

export const GetThreadMessagesSchema = z.object({
  conversationId: z.string().uuid(),
  take: z.string().optional(),
  skip: z.string().optional(),
  search: z.string().optional(),
});

export const ThreadMessagesSchema = z.object({
  conversationId: z.string().uuid({ message: "Invalid conversationId format" }),
  take: z.coerce.number().min(1).max(100).optional().default(20),
  skip: z.coerce.number().min(0).optional().default(0),
  search: z.string().optional(),
});
