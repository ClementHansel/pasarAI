// src/components/dashboard/ForecastingAnalytics/PerformanceIndicators.tsx
import React from "react";

const PerformanceIndicators: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-6">Performance Indicators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">ROI</h3>
          <p className="text-lg font-medium text-green-500">
            +30% over the last quarter
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Profit Margin</h3>
          <p className="text-lg font-medium text-green-500">+10% margin</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Customer Acquisition</h3>
          <p className="text-lg font-medium text-green-500">
            100 new customers in the past month
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceIndicators;
