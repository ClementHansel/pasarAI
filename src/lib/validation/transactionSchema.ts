// src/lib/validation/transactionSchema.ts
import { z } from "zod";

export const transactionSchema = z.object({
  action: z.enum(["top-up", "withdraw", "payment"]),
  accountId: z.string().min(1),
  amount: z.number().positive(),
  method: z.string().min(1),
  transactionId: z.string().optional(),
});
