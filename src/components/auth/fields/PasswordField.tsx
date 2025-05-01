// src/components/auth/fields/PasswordField.tsx
import React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePassword: () => void;
  error?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  value,
  onChange,
  showPassword,
  togglePassword,
  error,
}) => {
  // Determine placeholder and label based on field name
  const isConfirm = name === "confirmPassword";
  const label = isConfirm ? "Confirm Password" : "Password";
  const placeholder = isConfirm ? "Confirm your password" : "Create a password";
  const inputId = name;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {!isConfirm && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative">
        <input
          id={inputId}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full px-3 py-2 pl-10 pr-10 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        <Lock
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-2.5"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </button>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
