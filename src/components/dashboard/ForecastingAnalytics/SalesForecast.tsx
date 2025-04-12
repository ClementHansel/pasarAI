// src/components/dashboard/ForecastingAnalytics/SalesForecast.tsx
import React from "react";

interface SalesForecastData {
  month: string;
  predictedSales: number;
}

const salesForecastData: SalesForecastData[] = [
  { month: "January", predictedSales: 15000 },
  { month: "February", predictedSales: 16000 },
  { month: "March", predictedSales: 18000 },
  { month: "April", predictedSales: 20000 },
  { month: "May", predictedSales: 19000 },
];

const SalesForecast: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Sales Forecast</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Predicted Sales
            </th>
          </tr>
        </thead>
        <tbody>
          {salesForecastData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.predictedSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesForecast;
