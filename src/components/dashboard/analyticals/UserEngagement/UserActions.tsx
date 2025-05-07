// src/components/dashboard/UserEngagement/UserActions.tsx
import React from "react";

interface ActionData {
  action: string;
  count: number;
}

const actionData: ActionData[] = [
  { action: "Page Views", count: 15000 },
  { action: "Sign-Ups", count: 1200 },
  { action: "Purchases", count: 800 },
  { action: "Shares", count: 2000 },
];

const UserActions: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">User Actions</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Action
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {actionData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.action}</td>
              <td className="px-6 py-4">{data.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActions;
