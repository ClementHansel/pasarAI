// src/components/dashboard/ForecastingAnalytics/TrendSummary.tsx
import React from "react";

const TrendSummary: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-6">Trend Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Average Revenue Growth</h3>
          <p className="text-lg font-medium text-green-500">
            +18% over the past 6 months
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">
            Highest Performing Month
          </h3>
          <p className="text-lg font-medium text-blue-500">
            June with $30,000 in Revenue
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Profit Surge</h3>
          <p className="text-lg font-medium text-green-500">
            +25% increase in June
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendSummary;
