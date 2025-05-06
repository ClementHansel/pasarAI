"use client";

import React from "react";

import DeliveryCard from "./DeliveryCard";
import { Order } from "@/types/delivery";

interface DeliveryListProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const DeliveryList: React.FC<DeliveryListProps> = ({ orders, setOrders }) => {
  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No orders available for delivery.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <DeliveryCard key={order.id} order={order} setOrders={setOrders} />
      ))}
    </div>
  );
};

export default DeliveryList;
