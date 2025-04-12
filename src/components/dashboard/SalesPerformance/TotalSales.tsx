// src/components/dashboard/SalesPerformance/TotalSales.tsx
import React, { useEffect, useState } from "react";

// Placeholder data, replace with real data or API integration later
const fetchTotalSales = (): number => {
  return 150000; // Example value, in real use this would come from an API or data source
};

const TotalSales = () => {
  const [totalSales, setTotalSales] = useState<number>(0);

  useEffect(() => {
    const sales = fetchTotalSales();
    setTotalSales(sales);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Total Sales</h3>
      <p className="text-2xl font-bold text-blue-500">
        ${totalSales.toLocaleString()}
      </p>
    </div>
  );
};

export default TotalSales;
