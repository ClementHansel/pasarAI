export interface AccountRef {
  accountId: string;
  role: "buyer" | "seller" | "admin";
}

export interface Order {
  id: string;
  status: string;
  accounts: AccountRef[];
}
