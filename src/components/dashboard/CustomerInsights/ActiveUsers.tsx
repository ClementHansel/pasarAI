// src/components/dashboard/CustomerInsights/ActiveUsers.tsx

"use client";
import React, { useState, useEffect } from "react";

interface ActiveUserData {
  date: string;
  activeUsers: number;
}

const ActiveUsers: React.FC = () => {
  const [data, setData] = useState<ActiveUserData[]>([]);

  useEffect(() => {
    // Mock fetching active users data (replace with real API call)
    const mockData: ActiveUserData[] = [
      { date: "2025-04-01", activeUsers: 150 },
      { date: "2025-04-02", activeUsers: 200 },
      { date: "2025-04-03", activeUsers: 180 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Active Users</h2>
      <div className="mt-4">
        {data.map((item) => (
          <div key={item.date} className="flex justify-between p-2">
            <span>{item.date}</span>
            <span>{item.activeUsers}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveUsers;
