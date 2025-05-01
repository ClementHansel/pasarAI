import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// src/lib/utils.ts
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString("en-US", options);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getStatusColor(status: "pending" | "completed" | "cancelled"): {
  bg: string;
  text: string;
} {
  switch (status) {
    case "completed":
      return { bg: "bg-green-100", text: "text-green-800" };
    case "pending":
      return { bg: "bg-yellow-100", text: "text-yellow-800" };
    case "cancelled":
      return { bg: "bg-red-100", text: "text-red-800" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-800" };
  }
}
