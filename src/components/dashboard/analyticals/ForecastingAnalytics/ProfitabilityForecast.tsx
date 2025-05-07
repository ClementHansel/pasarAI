// src/components/dashboard/ForecastingAnalytics/ProfitabilityForecast.tsx
import React from "react";

interface ProfitabilityForecastData {
  month: string;
  predictedProfit: number;
}

const profitabilityForecastData: ProfitabilityForecastData[] = [
  { month: "January", predictedProfit: 5000 },
  { month: "February", predictedProfit: 5500 },
  { month: "March", predictedProfit: 6000 },
  { month: "April", predictedProfit: 6500 },
  { month: "May", predictedProfit: 7000 },
];

const ProfitabilityForecast: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Profitability Forecast</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Predicted Profit
            </th>
          </tr>
        </thead>
        <tbody>
          {profitabilityForecastData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.predictedProfit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfitabilityForecast;
