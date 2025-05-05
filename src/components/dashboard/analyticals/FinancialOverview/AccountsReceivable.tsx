import { AccountsReceivable as AccountsReceivableType } from "@/types/analytical/financial";
import React from "react";

interface AccountsReceivableProps {
  receivables: AccountsReceivableType[];
}

const statusColorMap: Record<AccountsReceivableType["status"], string> = {
  Overdue: "text-red-600",
  Pending: "text-yellow-600",
  Paid: "text-green-600",
};

const AccountsReceivable: React.FC<AccountsReceivableProps> = ({
  receivables,
}) => {
  const totalReceivables = receivables.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Accounts Receivable</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th>Client</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {receivables.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td>{item.client}</td>
              <td>{item.dueDate.toLocaleDateString()}</td>
              <td>${item.amount.toLocaleString()}</td>
              <td className={`${statusColorMap[item.status]} font-medium`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-4 font-semibold">
        Total Receivable: ${totalReceivables.toLocaleString()}
      </div>
    </div>
  );
};

export default AccountsReceivable;
