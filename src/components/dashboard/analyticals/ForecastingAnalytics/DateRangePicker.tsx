// src/components/dashboard/ForecastingAnalytics/DateRangePicker.tsx
import React, { useState } from "react";

const DateRangePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end"
  ) => {
    if (type === "start") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-6">Select Date Range</h2>
      <div className="flex space-x-4">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => handleDateChange(e, "start")}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => handleDateChange(e, "end")}
            className="p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
