// src/components/dashboard/FinancialOverview/AccountsReceivable.tsx
import React from "react";

interface Receivable {
  client: string;
  dueDate: string;
  amount: number;
  status: "Overdue" | "Pending" | "Paid";
}

const receivablesData: Receivable[] = [
  {
    client: "Alpha Corp",
    dueDate: "2025-04-05",
    amount: 1200,
    status: "Overdue",
  },
  {
    client: "Beta Ltd",
    dueDate: "2025-04-15",
    amount: 3000,
    status: "Pending",
  },
  { client: "Gamma Inc", dueDate: "2025-03-20", amount: 2500, status: "Paid" },
];

const statusColorMap = {
  Overdue: "text-red-600",
  Pending: "text-yellow-600",
  Paid: "text-green-600",
};

const AccountsReceivable: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Accounts Receivable</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Client</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {receivablesData.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td>{item.client}</td>
              <td>{item.dueDate}</td>
              <td>${item.amount.toLocaleString()}</td>
              <td className={`${statusColorMap[item.status]} font-medium`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsReceivable;
