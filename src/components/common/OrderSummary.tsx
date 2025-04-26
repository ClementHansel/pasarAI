// src/components/common/OrderSummary.tsx
"use client";

import React from "react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  deliveryMethod?: "standard" | "express";
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  deliveryMethod,
}) => {
  const productsTotal = items.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = deliveryMethod === "express" ? 5.99 : 0;
  const total = productsTotal + deliveryFee;

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold">Order Summary</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {deliveryMethod && (
        <div className="flex justify-between pt-2 border-t">
          <span>Delivery</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between pt-2 font-bold text-lg border-t">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
