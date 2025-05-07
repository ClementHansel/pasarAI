import { ActivityType, VoucherType } from "@prisma/client";
import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  activityType: z.enum(["VIEW", "PURCHASE", "LIKE", "SHARE"]),
  voucherType: z.enum(["MANUAL", "REFERRAL"]),
  avatar: z.string().optional(),
  currency: z
    .object({
      name: z.string(),
      description: z.string().optional(),
    })
    .optional(), // Optional if it can be omitted
});

export const updateAccountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  avatar: z.string().optional(),
  activityType: z.nativeEnum(ActivityType),
  voucherType: z.nativeEnum(VoucherType),
});

export const deleteAccountSchema = z.object({
  id: z.string().min(1),
});

export const currencySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});
