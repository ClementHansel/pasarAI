// src/components/layout/homepage/header/SearchBox.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  // Debounce user typing
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => onChange(local.trim()), 300);
    return () => clearTimeout(id);
  }, [local, onChange]);

  // Keep local in sync if parent resets it
  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search products..."
        className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
}
