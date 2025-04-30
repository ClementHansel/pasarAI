// src/components/auth/fields/RoleSelector.tsx
import React from "react";
import { User, Users } from "lucide-react";

interface RoleSelectorProps {
  role: "BUYER" | "SELLER";
  setRole: (role: "BUYER" | "SELLER") => void;
  error?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  role,
  setRole,
  error,
}) => (
  <fieldset>
    <legend className="block text-sm font-medium text-gray-700">
      Account Type <span className="text-red-500">*</span>
    </legend>
    <div className="mt-1 grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => setRole("BUYER")}
        className={`p-3 flex flex-col items-center border rounded-lg transition-colors ${
          role === "BUYER"
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-gray-200 hover:border-gray-300 text-gray-700"
        }`}
        aria-pressed={role === "BUYER"}
        aria-label="Select Buyer account type"
      >
        <User className="h-6 w-6 mb-1" aria-hidden="true" />
        <span className="text-sm font-medium">Buyer</span>
      </button>
      <button
        type="button"
        onClick={() => setRole("SELLER")}
        className={`p-3 flex flex-col items-center border rounded-lg transition-colors ${
          role === "SELLER"
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-gray-200 hover:border-gray-300 text-gray-700"
        }`}
        aria-pressed={role === "SELLER"}
        aria-label="Select Seller account type"
      >
        <Users className="h-6 w-6 mb-1" aria-hidden="true" />
        <span className="text-sm font-medium">Seller</span>
      </button>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
  </fieldset>
);
