// src/lib/validation/orderSchemas.ts
import { z } from "zod";

export const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  sku: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const CheckoutSchema = z.object({
  buyerId: z.string().uuid(),
  cartItems: z.array(OrderItemSchema).min(1),
  shippingAddress: z.string().min(1),
  paymentMethod: z.string().min(1),
});

export const UpdateOrderStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export const CartItemSchema = z.object({
  productId: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export const CreateOrderSchema = z.object({
  buyerId: z.string().min(1),
  cartItems: z.array(CartItemSchema).nonempty(),
  shippingAddress: z.string().min(1),
  paymentMethod: z.string().min(1),
});

export const UpdateOrderSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});
