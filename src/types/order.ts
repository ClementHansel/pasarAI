// types/order.ts
import { CartItem } from "./cart";

export interface Order {
  id: string;
  accountId: string;
  accountName: string;
  cart: CartItem[];
  shippingAddress: string;
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "canceled";
  createdAt: string;
}
