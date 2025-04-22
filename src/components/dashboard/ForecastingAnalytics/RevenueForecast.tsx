// src/components/dashboard/ForecastingAnalytics/RevenueForecast.tsx
import React from "react";

interface RevenueForecastData {
  month: string;
  predictedRevenue: number;
}

const revenueForecastData: RevenueForecastData[] = [
  { month: "January", predictedRevenue: 25000 },
  { month: "February", predictedRevenue: 27000 },
  { month: "March", predictedRevenue: 29000 },
  { month: "April", predictedRevenue: 30000 },
  { month: "May", predictedRevenue: 31000 },
];

const RevenueForecast: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Revenue Forecast</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Predicted Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {revenueForecastData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.predictedRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueForecast;
