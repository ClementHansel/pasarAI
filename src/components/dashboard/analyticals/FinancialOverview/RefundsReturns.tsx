"use client";
import React from "react";

interface RefundsReturnsProps {
  refunds: number;
  returns: number;
}

const RefundsReturns: React.FC<RefundsReturnsProps> = ({
  refunds,
  returns,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Refunds & Returns</h2>
      <p>
        Total Refunds:{" "}
        <span className="font-medium text-red-500">
          ${refunds.toLocaleString()}
        </span>
      </p>
      <p>
        Total Returns: <span className="font-medium">{returns} items</span>
      </p>
    </div>
  );
};

export default RefundsReturns;
