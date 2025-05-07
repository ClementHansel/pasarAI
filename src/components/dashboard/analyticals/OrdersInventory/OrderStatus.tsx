// src/components/dashboard/OrdersInventory/OrderStatus.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Order {
  id: number;
  customer: string;
  status: string;
}

const initialOrders: Order[] = [
  { id: 1, customer: "John Doe", status: "Pending" },
  { id: 2, customer: "Jane Smith", status: "Completed" },
  { id: 3, customer: "Robert Brown", status: "In Transit" },
  { id: 4, customer: "Emily White", status: "Pending" },
];

const OrderStatus: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    // Simulate fetching order data
    setTimeout(() => {
      setOrders([
        { id: 1, customer: "John Doe", status: "Pending" },
        { id: 2, customer: "Jane Smith", status: "Completed" },
        { id: 3, customer: "Robert Brown", status: "In Transit" },
        { id: 4, customer: "Emily White", status: "Pending" },
      ]);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Order Status</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="text-sm">
            <span className="font-bold">{order.customer}</span> - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderStatus;
