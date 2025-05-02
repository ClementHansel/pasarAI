// src/components/dashboard/ForecastingAnalytics/DemandForecast.tsx
import React from "react";

interface DemandForecastData {
  month: string;
  predictedDemand: number;
}

const demandForecastData: DemandForecastData[] = [
  { month: "January", predictedDemand: 500 },
  { month: "February", predictedDemand: 600 },
  { month: "March", predictedDemand: 700 },
  { month: "April", predictedDemand: 800 },
  { month: "May", predictedDemand: 750 },
];

const DemandForecast: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Demand Forecast</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Predicted Demand
            </th>
          </tr>
        </thead>
        <tbody>
          {demandForecastData.map((data, index) => (
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

export default DemandForecast;
