import React, { useState, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface SearchableSelectFieldProps {
  id?: string;
  icon: React.ReactElement;
  label: string;
  name: string;
  value: string; // The selected value that needs to be sent to the backend
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  fetchOptions: () => Promise<Option[]>; // Dynamically fetch options
}

export const SearchableSelectField: React.FC<SearchableSelectFieldProps> = ({
  id,
  icon,
  label,
  name,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  error,
  fetchOptions,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchOptions(); // Fetch dynamic options
        setOptions(data);
      } catch (err) {
        console.error("Failed to load options for", name, err);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [fetchOptions, name]);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative">
        <select
          id={id || name}
          name={name}
          value={value} // Bind the selected value to the state
          onChange={onChange}
          className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          disabled={loading}
        >
          <option value="">{loading ? "Loading..." : placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute left-3 top-2.5">{icon}</div>
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
