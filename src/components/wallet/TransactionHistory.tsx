// src/components/wallet/TransactionHistory.tsx
"use client";

import React from "react";
import { format } from "date-fns";
import { History } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import type { Transaction } from "@/types/wallet";

interface TransactionHistoryProps {
  transactions: Transaction[];
  filter?: string;
  userRole?: "user" | "seller";
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  filter = "all",
  userRole = "user",
}) => {
  // Determine default filter based on role
  const defaultFilter = userRole === "seller" ? "revenue" : "all";
  const effectiveFilter = filter !== "all" ? filter : defaultFilter;

  // Filter transactions by type
  const filteredTransactions = transactions.filter((tx) =>
    effectiveFilter === "all" ? true : tx.type === effectiveFilter
  );

  // Determine CSS classes for different transaction types
  const getTransactionColor = (type: Transaction["type"]) => {
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
      {/* Header with history icon and role-specific title */}
      <div className="flex items-center gap-2 mb-2">
        <History className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-semibold">
          {userRole === "seller"
            ? "Seller Transaction History"
            : "Transaction History"}
        </h3>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Showing:{" "}
        <span className="font-medium text-blue-600">
          {effectiveFilter === "all"
            ? "All transactions"
            : `${effectiveFilter} transactions`}
        </span>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        {filteredTransactions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No transactions found for this filter
          </div>
        ) : (
          <div className="divide-y">
            {filteredTransactions.map((transaction, index) => {
              // Determine badge variant, defaulting for unknown types
              let variant:
                | "default"
                | "revenue"
                | "topup"
                | "withdraw"
                | "bills";
              switch (transaction.type) {
                case "topup":
                case "revenue":
                case "withdraw":
                case "bills":
                  variant = transaction.type;
                  break;
                default:
                  variant = "default";
              }

              const dateObj = transaction.createdAt;
              const dateStr = dateObj
                ? format(new Date(dateObj), "dd MMM yyyy, HH:mm")
                : "";

              return (
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
                      <Badge variant={variant}>{transaction.type}</Badge>
                    </div>
                    <div>
                      <div className="font-medium capitalize">
                        {transaction.type}
                      </div>
                      <div className="text-sm text-gray-500">{dateStr}</div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${getTransactionColor(
                      transaction.type
                    )}`}
                  >
                    {["topup", "revenue"].includes(transaction.type)
                      ? "+"
                      : "-"}
                    Rp{transaction.amount.toLocaleString("id-ID")}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
