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
  value,
  onChange,
  showPassword,
  togglePassword,
  error,
}) => (
  <div>
    <label
      htmlFor="password"
      className="block text-sm font-medium text-gray-700"
    >
      Password <span className="text-red-500">*</span>
    </label>
    <div className="mt-1 relative">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={`appearance-none block w-full px-3 py-2 pl-10 pr-10 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Create a password"
        aria-invalid={!!error}
        aria-describedby={error ? "password-error" : undefined}
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
          id="password-error"
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  </div>
);
