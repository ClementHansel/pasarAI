// src/components/wallet/TransactionFilter.tsx
"use client";

import { useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

interface TransactionFilterProps {
  onFilterChange: (filter: string) => void;
  userRole: "user" | "seller";
}

export const TransactionFilter = ({
  onFilterChange,
  userRole,
}: TransactionFilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { value: "all", label: "All Transactions" },
    { value: "topup", label: "Top Ups" },
    { value: "withdraw", label: "Withdrawals" },
    { value: "bills", label: "Bill Payments" },
    ...(userRole === "seller" ? [{ value: "revenue", label: "Revenue" }] : []),
  ];

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <SelectPrimitive.Root
        value={selectedFilter}
        onValueChange={handleFilterChange}
      >
        <SelectPrimitive.Trigger className="inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-[200px]">
          <SelectPrimitive.Value placeholder="Filter transactions" />
          <SelectPrimitive.Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content className="z-50 mt-1 w-[200px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <SelectPrimitive.Viewport className="p-1">
            {filterOptions.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    </div>
  );
};
