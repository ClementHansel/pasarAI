"use client";

import React, { useState } from "react";
import { Order } from "@/types/delivery";
import {
  OrderStatus,
  isValidOrderStatus,
  formatStatus,
} from "@/lib/utils/statusUtils";

interface DeliveryStatusButtonProps {
  order: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

// ✅ Now using string values from the runtime object
const deliverySteps: OrderStatus[] = [
  OrderStatus.AWAITING_PICKUP,
  OrderStatus.IN_TRANSIT,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
];

const DeliveryStatusButton: React.FC<DeliveryStatusButtonProps> = ({
  order,
  setOrders,
}) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // ✅ Safe runtime check
  const isValid = isValidOrderStatus(order.status);
  const currentIndex = isValid
    ? deliverySteps.indexOf(order.status as OrderStatus)
    : -1;

  const isAuthorized = order.accounts.some(
    (account) => account.role === "seller"
  );

  if (!isValid) {
    return (
      <p className="text-red-600 font-semibold mt-4">
        Invalid status: {order.status}
      </p>
    );
  }

  if (currentIndex >= deliverySteps.length - 1) {
    return (
      <p className="text-green-600 font-semibold mt-4 flex items-center">
        <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        Delivery complete
      </p>
    );
  }

  const handleNextStep = async () => {
    const nextIndex = currentIndex + 1;
    const updatedStatus = deliverySteps[nextIndex];

    // Optimistic update
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: updatedStatus } : o))
    );

    setIsUpdating(true);

    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updatedStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }
    } catch (err) {
      // Revert on error
      setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
      console.error("Error updating order:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mt-4">
      {isAuthorized ? (
        <button
          onClick={handleNextStep}
          disabled={isUpdating || currentIndex === deliverySteps.length - 1}
          aria-label={`Move order ${order.id} to ${
            deliverySteps[currentIndex + 1]
          }`}
          className={`
            bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm
            transition-all duration-200 flex items-center
            ${isUpdating ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"}
          `}
        >
          {isUpdating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Updating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              Move to: {formatStatus(deliverySteps[currentIndex + 1])}
            </>
          )}
        </button>
      ) : (
        <p className="text-yellow-600 font-medium flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Not authorized
        </p>
      )}
    </div>
  );
};

export default DeliveryStatusButton;
