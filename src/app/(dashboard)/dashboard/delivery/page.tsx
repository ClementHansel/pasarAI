"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryList from "@/components/dashboard/delivery/DeliveryList";
import { Order } from "@/types/delivery";
import { getSession } from "next-auth/react";

const DeliveryPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      // Fetch orders from the API
      const response = await fetch("/api/delivery");
      if (!response.ok) {
        throw new Error("Failed to fetch delivery orders");
      }
      const data = await response.json();
      setOrders(data); // Set the fetched orders
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Handle the error if it's an instance of Error
      } else {
        setError("An unknown error occurred");
      } // Handle errors if any
    } finally {
      setLoading(false); // Set loading state to false after the request is complete
    }
  };

  useEffect(() => {
    // Check if the user is an admin
    const checkAdmin = async () => {
      const session = await getSession(); // Await the session
      if (session?.user?.role !== "ADMIN") {
        router.push("/dashboard"); // Redirect if not admin
      } else {
        fetchOrders(); // Fetch orders if the user is an admin
      }
    };
    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Delivery Management</h1>
      <p className="text-sm text-gray-600">
        Only accessible by admin. Simulates delivery flow via button.
      </p>

      <DeliveryList orders={orders} setOrders={setOrders} />
    </div>
  );
};

export default DeliveryPage;
