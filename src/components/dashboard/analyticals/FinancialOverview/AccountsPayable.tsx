// src/components/dashboard/FinancialOverview/AccountsPayable.tsx
import React from "react";

interface Payable {
  vendor: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
}

const payables: Payable[] = [
  {
    vendor: "Vendor A",
    amount: 3200,
    dueDate: "2025-04-20",
    status: "pending",
  },
  {
    vendor: "Vendor B",
    amount: 1500,
    dueDate: "2025-04-15",
    status: "overdue",
  },
  {
    vendor: "Vendor C",
    amount: 2000,
    dueDate: "2025-05-01",
    status: "pending",
  },
];

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

const AccountsPayable: React.FC = () => {
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
              <td>{p.dueDate}</td>
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
