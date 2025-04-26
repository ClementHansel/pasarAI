<<<<<<< HEAD
export interface WalletTransactionPayload {
  accountId: string;
  amount: number;
=======
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
>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
}
