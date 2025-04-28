import { z } from "zod";

export const MarketCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  revenue: z.number().nonnegative("Revenue must be a positive number"),
  description: z.string().optional(),
  currencyId: z.string(), // Add currencyId
  marketType: z.string().optional(),
  regionId: z.string().optional(),
  subregionId: z.string().optional(),
  cityId: z.string().optional(),
});

export const MarketUpdateSchema = z.object({
  id: z.string().uuid("Invalid market ID"),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  revenue: z.number().nonnegative("Revenue must be a positive number"),
});

export const MarketDeleteSchema = z.object({
  id: z.string().uuid("Invalid market ID"),
});
