// src/lib/validation/orderSchemas.ts
import { z } from "zod";

// Shared Enum for Order Status
export const OrderStatusEnum = z.enum([
  "PENDING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
]);

// Order item used in both checkout and cart
export const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  sku: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

// Used during checkout (validated payload from frontend)
export const CheckoutSchema = z.object({
  buyerId: z.string().uuid(),
  cartItems: z.array(OrderItemSchema).min(1),
  shippingAddress: z.string().min(1),
  paymentMethod: z.string().min(1),
});

// For raw cart item (e.g. local storage or frontend)
export const CartItemSchema = z.object({
  productId: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

// For creating an order from a cart (typically from frontend)
export const CreateOrderSchema = z.object({
  buyerId: z.string().min(1),
  cartItems: z.array(CartItemSchema).nonempty(),
  shippingAddress: z.string().min(1),
  paymentMethod: z.string().min(1),
});

// Unified schema for updating order status, optionally with cancel reason
export const UpdateOrderSchema = z.object({
  orderId: z.string().uuid(),
  status: OrderStatusEnum,
  cancelReason: z.string().optional(),
});
