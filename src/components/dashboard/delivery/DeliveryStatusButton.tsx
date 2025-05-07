"use client";

import { Order } from "@/types/delivery";
import React from "react";

interface DeliveryStatusButtonProps {
  order: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const deliverySteps = [
  "awaiting_pickup",
  "in_transit",
  "out_for_delivery",
  "delivered",
];

const DeliveryStatusButton: React.FC<DeliveryStatusButtonProps> = ({
  order,
  setOrders,
}) => {
  const currentIndex = deliverySteps.indexOf(order.status);

  const handleNextStep = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= deliverySteps.length) return;

    const updatedStatus = deliverySteps[nextIndex];

    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === order.id ? { ...o, status: updatedStatus } : o
      )
    );

    // Mock notification for buyer and seller
    const seller = order.accounts.find((a) => a.role === "seller");
    const buyer = order.accounts.find((a) => a.role === "buyer");

    console.log(
      `🔔 Notifying seller (${seller?.accountId}) and buyer (${buyer?.accountId}): Order ${order.id} updated to "${updatedStatus}"`
    );
  };

  return (
    <div className="mt-4">
      {currentIndex < deliverySteps.length - 1 ? (
        <button
          onClick={handleNextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Move to: {deliverySteps[currentIndex + 1].replace(/_/g, " ")}
        </button>
      ) : (
        <p className="text-green-600 font-semibold">Delivery complete</p>
      )}
    </div>
  );
};

export default DeliveryStatusButton;
