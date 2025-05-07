// src/components/dashboard/FinancialOverview/AccountsPayable.tsx
import { AccountsPayable as AccountsPayableType } from "@/types/analytical/financial";
import React from "react";

interface AccountsPayableProps {
  payables: AccountsPayableType[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-yellow-600";
    case "paid":
      return "text-green-600";
    case "overdue":
      return "text-red-600";
    default:
      return "";
  }
};

const AccountsPayable: React.FC<AccountsPayableProps> = ({ payables }) => {
  const totalPayables = payables.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Accounts Payable</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Vendor</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payables.map((p, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-2">{p.vendor}</td>
              <td>${p.amount.toLocaleString()}</td>
              <td>{p.dueDate.toLocaleDateString()}</td>
              <td className={getStatusColor(p.status)}>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-4 font-semibold">
        Total Due: ${totalPayables.toLocaleString()}
      </div>
    </div>
  );
};

export default AccountsPayable;
