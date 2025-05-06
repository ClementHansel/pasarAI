// src/components/dashboard/orders/OrdersList.tsx
"use client";

import { Order } from "@/types/order";
import OrderCard from "./OrderCard";
import { useEffect, useState } from "react";

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token missing");

        const userRes = await fetch("/api/auth/check", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error("Failed to verify user");

        const { user } = await userRes.json();

        const orderRes = await fetch(`/api/seller-orders?sellerId=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!orderRes.ok) throw new Error("Failed to fetch orders");

        const data: Order[] = await orderRes.json();
        setOrders(data);
      } catch (err) {
        setError("An error occurred while fetching orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading orders...</div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!orders.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        You have no customer orders at the moment.
      </div>
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
