// src/components/dashboard/ForecastingAnalytics/SeasonalDemandForecast.tsx
import React from "react";

interface SeasonalDemandForecastData {
  month: string;
  predictedDemand: number;
}

const seasonalDemandForecastData: SeasonalDemandForecastData[] = [
  { month: "Spring", predictedDemand: 200 },
  { month: "Summer", predictedDemand: 500 },
  { month: "Fall", predictedDemand: 300 },
  { month: "Winter", predictedDemand: 400 },
];

const SeasonalDemandForecast: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Seasonal Demand Forecast</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Season
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Predicted Demand
            </th>
          </tr>
        </thead>
        <tbody>
          {seasonalDemandForecastData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.predictedDemand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeasonalDemandForecast;
