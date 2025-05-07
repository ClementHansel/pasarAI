// src/components/dashboard/UserEngagement/CustomerSatisfaction.tsx
import React from "react";

interface SatisfactionData {
  month: string;
  satisfactionRate: number;
}

const satisfactionData: SatisfactionData[] = [
  { month: "January", satisfactionRate: 85 },
  { month: "February", satisfactionRate: 90 },
  { month: "March", satisfactionRate: 87 },
  { month: "April", satisfactionRate: 92 },
  { month: "May", satisfactionRate: 94 },
];

const CustomerSatisfaction: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Customer Satisfaction</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Satisfaction Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {satisfactionData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.satisfactionRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSatisfaction;
