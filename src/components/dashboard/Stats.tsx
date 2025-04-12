// src/components/dashboard/Stats.tsx
import React, { useEffect, useState } from "react";

interface StatsData {
  totalSales: number;
  activeUsers: number;
  totalOrders: number;
}

const Stats = () => {
  // Mock data for now, you can replace this with dynamic data or API calls
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    // Simulating data fetch, replace this with API or context fetching
    const fetchStats = () => {
      const mockStats: StatsData = {
        totalSales: 125000, // Mock total sales amount
        activeUsers: 350, // Mock active users
        totalOrders: 1500, // Mock total orders
      };
      setStats(mockStats);
    };

    fetchStats(); // Simulate fetching data when the component mounts
  }, []);

  if (!stats) {
    return <div>Loading...</div>; // Show loading state while stats are being fetched
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Sales */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Total Sales</h3>
        <p className="text-3xl font-bold text-green-600">
          ${stats.totalSales.toLocaleString()}
        </p>
      </div>

      {/* Active Users */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Active Users</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.activeUsers}</p>
      </div>

      {/* Total Orders */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Total Orders</h3>
        <p className="text-3xl font-bold text-orange-600">
          {stats.totalOrders}
        </p>
      </div>
    </div>
  );
};

export default Stats;
