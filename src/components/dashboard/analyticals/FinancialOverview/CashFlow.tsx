// src/components/dashboard/FinancialOverview/CashFlowSummary.tsx
import React from "react";

interface CashFlowItem {
  type: "Inflow" | "Outflow";
  description: string;
  amount: number;
}

const cashFlowData: CashFlowItem[] = [
  { type: "Inflow", description: "Sales Revenue", amount: 35000 },
  { type: "Inflow", description: "Investments", amount: 10000 },
  { type: "Outflow", description: "Salaries", amount: 25000 },
  { type: "Outflow", description: "Operational Costs", amount: 10000 },
];

const CashFlowSummary: React.FC = () => {
  const inflow = cashFlowData
    .filter((item) => item.type === "Inflow")
    .reduce((sum, item) => sum + item.amount, 0);

  const outflow = cashFlowData
    .filter((item) => item.type === "Outflow")
    .reduce((sum, item) => sum + item.amount, 0);

  const netCashFlow = inflow - outflow;

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Cash Flow Summary</h2>
      <ul className="space-y-2 text-sm">
        {cashFlowData.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>
              {item.type === "Inflow" ? "🟢" : "🔴"} {item.description}
            </span>
            <span
              className={
                item.type === "Inflow" ? "text-green-600" : "text-red-600"
              }
            >
              ${item.amount.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t pt-2 font-semibold flex justify-between">
        <span>Net Cash Flow</span>
        <span className={netCashFlow >= 0 ? "text-green-700" : "text-red-700"}>
          ${netCashFlow.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default CashFlowSummary;
