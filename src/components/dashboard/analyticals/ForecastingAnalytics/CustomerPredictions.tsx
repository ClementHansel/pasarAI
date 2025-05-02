// src/components/dashboard/ForecastingAnalytics/CustomerPredictions.tsx
import React from "react";

interface CustomerPredictionData {
  prediction: string;
  confidence: number;
  predictedCount: number;
}

const customerPredictionData: CustomerPredictionData[] = [
  {
    prediction: "Increase in Customer Acquisition",
    confidence: 85,
    predictedCount: 1500,
  },
  { prediction: "Increase in Retention", confidence: 78, predictedCount: 1200 },
  { prediction: "Increase in Churn", confidence: 60, predictedCount: 300 },
];

const CustomerPredictions: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Customer Predictions</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Prediction
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Confidence (%)
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Predicted Count
            </th>
          </tr>
        </thead>
        <tbody>
          {customerPredictionData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.prediction}</td>
              <td className="px-6 py-4">{data.confidence}%</td>
              <td className="px-6 py-4">{data.predictedCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPredictions;
