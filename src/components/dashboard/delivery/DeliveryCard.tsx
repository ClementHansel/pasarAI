"use client";

import React from "react";
import DeliveryStatusButton from "./DeliveryStatusButton";
import { Order } from "@/types/delivery";
import {
  formatStatus,
  getStatusColor,
  isValidOrderStatus,
} from "@/lib/utils/statusUtils";

interface DeliveryCardProps {
  order: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ order, setOrders }) => {
  const seller = order.accounts.find((a) => a.role === "seller");
  const buyer = order.accounts.find((a) => a.role === "buyer");

  // Validate status at runtime
  const isValid = isValidOrderStatus(order.status);

  return (
    <div className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
        <p className="text-sm text-gray-600">
          Seller: {seller?.accountId ?? "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          Buyer: {buyer?.accountId ?? "Unknown"}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm">
          <span className="font-medium">Status:</span>{" "}
          <span className={`capitalize ${getStatusColor(order.status)}`}>
            {isValid
              ? formatStatus(order.status)
              : `Invalid Status: ${order.status}`}
          </span>
        </p>
      </div>

      <DeliveryStatusButton order={order} setOrders={setOrders} />
    </div>
  );
};

export default DeliveryCard;
