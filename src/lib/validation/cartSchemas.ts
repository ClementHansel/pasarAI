import { z } from "zod";

export const CartItemSchema = z.object({
  accountId: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const UpdateCartSchema = z.object({
  accountId: z.string(),
  productId: z.string(),
  newQuantity: z.number().int().positive(),
});

export const RemoveCartSchema = z.object({
  accountId: z.string(),
  productId: z.string(),
});

export const SingleRemoveCartSchema = z.object({
  productId: z.string().min(1),
});

export const BulkRemoveCartSchema = z.object({
  accountId: z.string(),
  productIds: z.array(z.string().min(1)),
});

export const SyncCartSchema = z.object({
  items: z.array(
    z.object({
      accountId: z.string(),
      productId: z.string(),
      quantity: z.number().int().min(1),
    })
  ),
});
