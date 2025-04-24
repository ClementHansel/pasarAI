export type TransactionType =
  | "topup"
  | "withdraw"
  | "bills"
  | "revenue"
  | "initial";

export interface Transaction {
  type: TransactionType;
  amount: number;
  date: string;
}
