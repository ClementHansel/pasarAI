// src/components/dashboard/ForecastingAnalytics/InventoryForecast.tsx
import React from "react";

interface InventoryForecastData {
  month: string;
  predictedInventory: number;
}

const inventoryForecastData: InventoryForecastData[] = [
  { month: "January", predictedInventory: 800 },
  { month: "February", predictedInventory: 850 },
  { month: "March", predictedInventory: 900 },
  { month: "April", predictedInventory: 950 },
  { month: "May", predictedInventory: 1000 },
];

const InventoryForecast: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Inventory Forecast</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Predicted Inventory
            </th>
          </tr>
        </thead>
        <tbody>
          {inventoryForecastData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.predictedInventory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryForecast;
