// src/components/wallet/TransactionHistory.tsx
"use client";

import { format } from "date-fns";
import { History } from "lucide-react";

interface Transaction {
  type: string;
  amount: number;
  date: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100">
      {transactions.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No transactions yet</div>
      ) : (
        <div className="divide-y">
          {transactions.map((transaction, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{transaction.type}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(transaction.date), "dd MMM yyyy, HH:mm")}
                </div>
              </div>
              <div
                className={`font-semibold ${
                  transaction.type === "topup"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "topup" ? "+" : "-"}Rp
                {transaction.amount.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
