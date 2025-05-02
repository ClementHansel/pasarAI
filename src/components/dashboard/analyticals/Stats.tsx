"use client";
import React, { useEffect, useState } from "react";

// Define StatsData interface
interface StatsData {
  totalSales: number;
  activeUsers: number;
  totalOrders: number;
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isClient, setIsClient] = useState(false); // Flag to detect client-side rendering

  useEffect(() => {
    setIsClient(true); // Set the flag to true once the component is mounted on the client-side

    const fetchStats = () => {
      setTimeout(() => {
        const mockStats: StatsData = {
          totalSales: 125000,
          activeUsers: 350,
          totalOrders: 1500,
        };
        setStats(mockStats);
      }, 500);
    };

    fetchStats();
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  if (!stats) {
    return (
      <div className="py-8 text-center text-gray-500">
        Loading dashboard stats...
      </div>
    );
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
