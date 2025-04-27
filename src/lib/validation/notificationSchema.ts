import { z } from "zod";

export const updateNotificationSchema = z.object({
  read: z.boolean().optional(),
  status: z.enum(["pending", "sent", "failed"]).optional(),
});
