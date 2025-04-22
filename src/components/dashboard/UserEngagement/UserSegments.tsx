// src/components/dashboard/UserEngagement/UserSegments.tsx
import React from "react";

interface SegmentData {
  segmentName: string;
  activeUsers: number;
  churnRate: number;
}

const segmentData: SegmentData[] = [
  { segmentName: "New Users", activeUsers: 1200, churnRate: 15 },
  { segmentName: "Returning Users", activeUsers: 850, churnRate: 5 },
  { segmentName: "High Value Users", activeUsers: 600, churnRate: 3 },
  { segmentName: "Inactive Users", activeUsers: 400, churnRate: 25 },
];

const UserSegments: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">User Segments</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Segment Name
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Active Users
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Churn Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {segmentData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.segmentName}</td>
              <td className="px-6 py-4">{data.activeUsers}</td>
              <td className="px-6 py-4">{data.churnRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSegments;
