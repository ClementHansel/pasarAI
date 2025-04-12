// src/components/dashboard/ForecastingAnalytics/MarketingROIForecast.tsx
import React from "react";

interface MarketingROIForecastData {
  month: string;
  predictedROI: number;
}

const marketingROIForecastData: MarketingROIForecastData[] = [
  { month: "January", predictedROI: 200 },
  { month: "February", predictedROI: 250 },
  { month: "March", predictedROI: 300 },
  { month: "April", predictedROI: 350 },
  { month: "May", predictedROI: 400 },
];

const MarketingROIForecast: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Marketing ROI Forecast</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Predicted ROI
            </th>
          </tr>
        </thead>
        <tbody>
          {marketingROIForecastData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.predictedROI}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingROIForecast;
