// src/components/dashboard/ShippingDelivery/DelayedShipments.tsx
import React, { useState, useEffect } from "react";

interface Shipment {
  orderId: string;
  delayReason: string;
  expectedDelivery: string;
  currentStatus: string;
}

const DelayedShipments: React.FC = () => {
  const [delayedShipments, setDelayedShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    // Simulating fetching delayed shipments data
    setTimeout(() => {
      const shipments: Shipment[] = [
        {
          orderId: "ORD123",
          delayReason: "Weather delay",
          expectedDelivery: "2022-09-12",
          currentStatus: "Delayed",
        },
        {
          orderId: "ORD124",
          delayReason: "Customs clearance",
          expectedDelivery: "2022-09-13",
          currentStatus: "Delayed",
        },
      ];
      setDelayedShipments(shipments);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Delayed Shipments</h2>
      <table className="min-w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Delay Reason</th>
            <th className="px-4 py-2 border">Expected Delivery</th>
            <th className="px-4 py-2 border">Current Status</th>
          </tr>
        </thead>
        <tbody>
          {delayedShipments.map((shipment, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{shipment.orderId}</td>
              <td className="px-4 py-2 border">{shipment.delayReason}</td>
              <td className="px-4 py-2 border">{shipment.expectedDelivery}</td>
              <td className="px-4 py-2 border">{shipment.currentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DelayedShipments;
