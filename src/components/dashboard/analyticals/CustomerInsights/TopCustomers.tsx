// src/components/dashboard/CustomerInsights/TopCustomers.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Customer {
  name: string;
  totalSpent: number;
}

const TopCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Mock fetching top customers data (replace with real API call)
    const mockData: Customer[] = [
      { name: "John Doe", totalSpent: 1200 },
      { name: "Jane Smith", totalSpent: 950 },
      { name: "David Johnson", totalSpent: 850 },
    ];
    setCustomers(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Top Customers</h2>
      <div className="mt-4">
        {customers.map((customer, index) => (
          <div key={index} className="flex justify-between p-2">
            <span>{customer.name}</span>
            <span>${customer.totalSpent}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomers;
