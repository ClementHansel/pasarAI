export interface WalletTransactionPayload {
  accountId: string;
  amount: number;
}

export type TransactionType =
  | "topup"
  | "initial"
  | "withdraw"
  | "payment"
  | "refund"
  | "bills"
  | "revenue";

export type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  description?: string;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
};
