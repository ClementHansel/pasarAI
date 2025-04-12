// src/components/dashboard/UserEngagement/RetentionRate.tsx
import React from "react";

interface RetentionData {
  month: string;
  retentionRate: number;
}

const retentionData: RetentionData[] = [
  { month: "January", retentionRate: 80 },
  { month: "February", retentionRate: 85 },
  { month: "March", retentionRate: 82 },
  { month: "April", retentionRate: 87 },
  { month: "May", retentionRate: 90 },
];

const RetentionRate: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Retention Rate</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Retention Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {retentionData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.retentionRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RetentionRate;
