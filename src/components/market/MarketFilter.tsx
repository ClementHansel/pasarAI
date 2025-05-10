// src/components/market/MarketFilter.tsx
"use client";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

interface MarketFilterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  // Add onFilter explicitly if it is intended to be used
  onFilter?: (value: string) => void;
}

export const MarketFilter: React.FC<MarketFilterProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  onFilter, // Explicitly handle onFilter
  ...rest
}) => {
  // Debounce user typing
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      onChange({
        target: { value: local },
      } as React.ChangeEvent<HTMLInputElement>);
      if (onFilter) {
        onFilter(local.trim());
      }
    }, 300);
    return () => clearTimeout(id);
  }, [local, onChange, onFilter]);

  // Keep local in sync if parent resets it
  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative w-full max-w-md mx-auto">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          {...rest}
        />
      </div>
    </form>
  );
};
