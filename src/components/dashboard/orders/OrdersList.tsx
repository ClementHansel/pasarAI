"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Order } from "@/types/order";
import OrderCard from "./OrderCard";

export default function OrdersList() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`/api/orders?sellerId=${session.user.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        setError("An error occurred while fetching orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session?.user?.id]);

  if (loading) {
    return <p className="text-gray-500 mt-6">Loading orders...</p>;
  }

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
