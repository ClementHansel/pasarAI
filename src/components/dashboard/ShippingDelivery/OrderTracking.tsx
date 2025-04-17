// src/components/dashboard/ShippingDelivery/OrderTracking.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Order {
  orderId: string;
  status: string;
  estimatedDelivery: string;
}

const OrderTracking: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulating fetching order tracking data
    setTimeout(() => {
      const orderData: Order[] = [
        {
          orderId: "ORD123",
          status: "Shipped",
          estimatedDelivery: "2022-09-15",
        },
        {
          orderId: "ORD124",
          status: "In Transit",
          estimatedDelivery: "2022-09-16",
        },
      ];
      setOrders(orderData);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
      <table className="min-w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Estimated Delivery</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{order.orderId}</td>
              <td className="px-4 py-2 border">{order.status}</td>
              <td className="px-4 py-2 border">{order.estimatedDelivery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTracking;
