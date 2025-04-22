// src/components/dashboard/UserEngagement/ChurnRate.tsx
import React from "react";

interface ChurnRateData {
  month: string;
  churnRate: number;
}

const churnData: ChurnRateData[] = [
  { month: "January", churnRate: 4.5 },
  { month: "February", churnRate: 5.0 },
  { month: "March", churnRate: 4.2 },
  { month: "April", churnRate: 4.8 },
  { month: "May", churnRate: 5.1 },
];

const ChurnRate: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Churn Rate</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Churn Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {churnData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.churnRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChurnRate;
