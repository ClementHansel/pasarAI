// src/components/wallet/TransactionHistory.tsx
"use client";

import { format } from "date-fns";
import { History } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Transaction } from "@/types/wallet";

interface TransactionHistoryProps {
  transactions: Transaction[];
  filter?: string;
  userRole?: "user" | "seller";
}

export const TransactionHistory = ({
  transactions,
  filter = "all",
  userRole = "user",
}: TransactionHistoryProps) => {
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "topup":
      case "revenue":
        return "text-green-600 bg-green-50 border-green-100";
      case "withdraw":
      case "bills":
        return "text-red-600 bg-red-50 border-red-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-4">
        Showing:{" "}
        <span className="font-medium text-blue-600">
          {filter === "all" ? "All transactions" : `${filter} transactions`}
        </span>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        {filteredTransactions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No transactions found for this filter
          </div>
        ) : (
          <div className="divide-y">
            {filteredTransactions.map((transaction, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${getTransactionColor(
                      transaction.type
                    )}`}
                  >
                    <Badge variant={transaction.type}>{transaction.type}</Badge>
                  </div>
                  <div>
                    <div className="font-medium capitalize">
                      {transaction.type}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(transaction.date), "dd MMM yyyy, HH:mm")}
                    </div>
                  </div>
                </div>
                <div
                  className={`font-semibold ${getTransactionColor(
                    transaction.type
                  )}`}
                >
                  {["topup", "revenue"].includes(transaction.type) ? "+" : "-"}
                  Rp
                  {transaction.amount.toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
