// src/components/dashboard/UserEngagement/UserAcquisitionGrowth.tsx
import React from "react";

interface AcquisitionData {
  month: string;
  newUsers: number;
  totalUsers: number;
}

const acquisitionData: AcquisitionData[] = [
  { month: "January", newUsers: 1200, totalUsers: 5000 },
  { month: "February", newUsers: 1500, totalUsers: 6500 },
  { month: "March", newUsers: 1300, totalUsers: 7800 },
  { month: "April", newUsers: 1100, totalUsers: 8900 },
  { month: "May", newUsers: 1400, totalUsers: 10300 },
];

const UserAcquisitionGrowth: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">User Acquisition Growth</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              New Users
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Total Users
            </th>
          </tr>
        </thead>
        <tbody>
          {acquisitionData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.newUsers}</td>
              <td className="px-6 py-4">{data.totalUsers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAcquisitionGrowth;
