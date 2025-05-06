// src/components/dashboard/orders/OrderFilter.tsx
import React, { useState } from "react";

interface OrderFilterProps {
  onFilter: (status: string) => void;
}

export default function OrderFilter({ onFilter }: OrderFilterProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by status:
      </label>
      <select
        value={selectedStatus}
        onChange={(e) => {
          setSelectedStatus(e.target.value);
          onFilter(e.target.value);
        }}
        className="w-full p-2 border rounded-md"
      >
        <option value="all">All Orders</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}
