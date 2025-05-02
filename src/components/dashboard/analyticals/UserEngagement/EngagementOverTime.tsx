// src/components/dashboard/UserEngagement/EngagementOverTime.tsx
import React from "react";

interface EngagementData {
  month: string;
  engagementRate: number;
}

const engagementData: EngagementData[] = [
  { month: "January", engagementRate: 70 },
  { month: "February", engagementRate: 75 },
  { month: "March", engagementRate: 72 },
  { month: "April", engagementRate: 80 },
  { month: "May", engagementRate: 85 },
];

const EngagementOverTime: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">User Engagement Over Time</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Engagement Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {engagementData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.engagementRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EngagementOverTime;
