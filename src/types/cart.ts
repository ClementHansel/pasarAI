// types/cart.ts
// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

export interface SessionData {
  cart: CartItem[];
}
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  image: string;
  marketId: string;
  marketName: string;
  discountPercentage?: number;
}
