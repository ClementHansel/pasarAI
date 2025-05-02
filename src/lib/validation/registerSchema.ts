// src/utils/validation/registerSchema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name must be at least 1 character"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .regex(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
        "Password must be at least 8 characters long and include at least one special character"
      ),
    confirmPassword: z.string(),
    role: z.enum(["BUYER", "SELLER"]),
    currency: z.string().min(1, "Currency is required"),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    country: z.string().optional(),
    profileImage: z.string().optional(),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
