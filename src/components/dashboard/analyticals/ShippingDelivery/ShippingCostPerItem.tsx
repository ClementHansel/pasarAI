// src/components/dashboard/ShippingDelivery/ShippingCostPerItem.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Order {
  orderId: string;
  totalCost: number;
  numItems: number;
}

const ShippingCostPerItem: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulating fetching order data
    setTimeout(() => {
      const orderData: Order[] = [
        { orderId: "ORD001", totalCost: 15, numItems: 3 },
        { orderId: "ORD002", totalCost: 25, numItems: 5 },
      ];
      setOrders(orderData);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Shipping Cost Per Item</h2>
      <table className="min-w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Total Cost ($)</th>
            <th className="px-4 py-2 border">Items</th>
            <th className="px-4 py-2 border">Cost per Item ($)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{order.orderId}</td>
              <td className="px-4 py-2 border">{order.totalCost}</td>
              <td className="px-4 py-2 border">{order.numItems}</td>
              <td className="px-4 py-2 border">
                {(order.totalCost / order.numItems).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingCostPerItem;
