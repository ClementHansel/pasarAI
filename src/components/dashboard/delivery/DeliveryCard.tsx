"use client";

import React from "react";

import DeliveryStatusButton from "./DeliveryStatusButton";
import { Order } from "@/types/delivery";

interface DeliveryCardProps {
  order: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ order, setOrders }) => {
  const seller = order.accounts.find((a) => a.role === "seller");
  const buyer = order.accounts.find((a) => a.role === "buyer");

  return (
    <div className="border rounded-xl shadow-sm p-4 bg-white">
      <div className="mb-2">
        <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
        <p className="text-sm text-gray-600">
          Seller: {seller?.accountId ?? "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          Buyer: {buyer?.accountId ?? "Unknown"}
        </p>
      </div>

      <div className="mb-2">
        <p className="text-sm">
          <span className="font-medium">Status:</span>{" "}
          <span className="capitalize">{order.status.replace(/_/g, " ")}</span>
        </p>
      </div>

      <DeliveryStatusButton order={order} setOrders={setOrders} />
    </div>
  );
};

export default DeliveryCard;
