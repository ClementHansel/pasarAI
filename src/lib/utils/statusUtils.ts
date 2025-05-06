// src/lib/utils/statusUtils.ts

/**
 * Runtime object containing valid order statuses
 */
export const OrderStatus = {
  AWAITING_PICKUP: "awaiting_pickup",
  IN_TRANSIT: "in_transit",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
} as const;

/**
 * TypeScript type derived from the runtime object
 */
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

/**
 * Type guard to validate if a string is a valid OrderStatus
 */
export const isValidOrderStatus = (status: string): status is OrderStatus => {
  return Object.values(OrderStatus).includes(status as OrderStatus);
};

/**
 * Format the status for display
 */
export const formatStatus = (status: string): string => {
  if (isValidOrderStatus(status)) {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return `Invalid Status: ${status}`;
};

/**
 * Get Tailwind class based on status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case OrderStatus.AWAITING_PICKUP:
      return "text-yellow-600";
    case OrderStatus.IN_TRANSIT:
      return "text-blue-600";
    case OrderStatus.OUT_FOR_DELIVERY:
      return "text-purple-600";
    case OrderStatus.DELIVERED:
      return "text-green-600";
    default:
      return "text-red-600";
  }
};
