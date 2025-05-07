import React from "react";

interface Expense {
  category: string;
  amount: number;
}

interface OperatingExpensesProps {
  expenses: Expense[];
}

const OperatingExpenses: React.FC<OperatingExpensesProps> = ({ expenses }) => {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Operating Expenses</h2>
      <ul className="space-y-2">
        {expenses.map((exp) => (
          <li key={exp.category} className="flex justify-between text-sm">
            <span>{exp.category}</span>
            <span>${exp.amount.toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-semibold border-t pt-2 flex justify-between">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OperatingExpenses;
