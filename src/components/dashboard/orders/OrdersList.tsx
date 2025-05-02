import { Order } from "@/types/order";
import OrderCard from "./OrderCard";
import { useEffect, useState } from "react";

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the orders on component mount
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/seller-orders");
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        setError("An error occurred while fetching orders.");
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <p className="text-red-500 mt-6">{error}</p>;
  }

  if (!orders.length) {
    return (
      <p className="text-gray-500 mt-6">
        You have no customer orders at the moment.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
