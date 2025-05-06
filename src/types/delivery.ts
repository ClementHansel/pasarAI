export interface AccountRef {
  accountId: string;
  role: "buyer" | "seller" | "admin";
}

export interface Order {
  id: string;
  status: string;
  accounts: AccountRef[];
}

export type OrderStatus =
  | "awaiting_pickup"
  | "in_transit"
  | "out_for_delivery"
  | "delivered";
