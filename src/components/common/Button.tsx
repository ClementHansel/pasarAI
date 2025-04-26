// src/components/common/Button.tsx

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost"
    | "outline"
    | "default";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled,
  variant = "primary",
  size = "md", // Default size is "md"
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium focus:outline-none transition-all";

  // Define the button size styles
  const sizeStyles: Record<string, string> = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4", // Default size
    lg: "text-lg py-3 px-6",
  };

  // Define the button variant styles
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost:
      "bg-transparent border-2 border-gray-300 text-gray-800 hover:bg-gray-100", // Ghost variant
  };

  // Apply styles for loading or disabled states
  const disabledOrLoadingStyles =
    disabled || loading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${disabledOrLoadingStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
