import { ActivityType, VoucherType } from "@prisma/client";
import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  avatar: z.string().optional(),
  password: z.string().min(6),
  activityType: z.nativeEnum(ActivityType),
  voucherType: z.nativeEnum(VoucherType),
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
