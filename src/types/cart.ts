// types/cart.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface SessionData {
  cart: CartItem[];
}
