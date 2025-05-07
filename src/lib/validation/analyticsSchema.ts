import { Prisma } from "@prisma/client";
import { z } from "zod";

export const analyticsEventSchema = z.object({
  eventName: z.string().min(1),
  widgetId: z.string(),
  widgetType: z.string(),
  action: z.enum(["viewed", "clicked", "updated", "deleted"]),
  accountId: z.string().optional(),
  metadata: z.custom<Prisma.JsonObject>().optional(),
  timestamp: z.string().datetime().optional(),
});

export const analyticsBatchSchema = z.object({
  events: z.array(analyticsEventSchema).min(1),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
