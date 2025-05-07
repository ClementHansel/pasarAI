// src/components/InputField.tsx

import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  icon,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center border rounded">
        {icon && <span className="mr-2">{icon}</span>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 w-full"
          required={required}
          placeholder={placeholder}
          aria-label={label}
        />
      </div>
    </div>
  );
};

export default InputField;
