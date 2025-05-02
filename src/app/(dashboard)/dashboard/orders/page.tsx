// src/app/(dashboard)/dashboard/orders/page.tsx

import { Suspense } from "react";
import OrdersList from "@/components/dashboard/orders/OrdersList";
import Header from "@/components/layout/homepage/header/Header";
import { Spinner } from "react-bootstrap";

export default function OrdersPage() {
  return (
    <div className="p-6 space-y-6">
      <Header />

      <div>
        <h1>Customer Orders</h1>
        <h2>View and manage incoming customer orders.</h2>
      </div>

      <Suspense fallback={<Spinner />}>
        <OrdersList />
      </Suspense>
    </div>
  );
}
