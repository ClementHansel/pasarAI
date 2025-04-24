// src/components/common/Badge.tsx
"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "topup" | "withdraw" | "bills" | "revenue" | "default";
}

export const Badge = ({
  className,
  variant = "default",
  ...props
}: BadgeProps) => {
  return (
    <div
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full border",
        {
          "bg-green-100 text-green-700 border-green-200": variant === "topup",
          "bg-red-100 text-red-700 border-red-200": variant === "withdraw",
          "bg-blue-100 text-blue-700 border-blue-200": variant === "bills",
          "bg-purple-100 text-purple-700 border-purple-200":
            variant === "revenue",
          "bg-gray-100 text-gray-700 border-gray-200": variant === "default",
        },
        className
      )}
      {...props}
    />
  );
};
