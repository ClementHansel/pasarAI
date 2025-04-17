// src/components/dashboard/FinancialOverview/RefundsReturns.tsx
"use client";
import React, { useEffect, useState } from "react";

const RefundsReturns: React.FC = () => {
  const [refunds, setRefunds] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);

  useEffect(() => {
    setRefunds(3800); // mock data
    setReturns(45); // items
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Refunds & Returns</h2>
      <p>
        Total Refunds:{" "}
        <span className="font-medium text-red-500">${refunds}</span>
      </p>
      <p>
        Total Returns: <span className="font-medium">{returns} items</span>
      </p>
    </div>
  );
};

export default RefundsReturns;
