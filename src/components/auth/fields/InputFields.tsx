// src/components/auth/fields/InputField.tsx
import React from "react";
// import { IconType } from "react-icons"; // Error here IconTypeNeverUsed

interface InputFieldProps {
  icon: React.ReactElement;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  name: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  name,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="mt-1 relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <div className="absolute left-3 top-2.5" aria-hidden="true">
        {icon}
      </div>
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  </div>
);
