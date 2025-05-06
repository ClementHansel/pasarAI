// src/app/(dashboard)/dashboard/orders/page.tsx
import { Suspense } from "react";
import OrdersList from "@/components/dashboard/orders/OrdersList";
import { Spinner } from "react-bootstrap";
import { RouteGuard } from "@/components/auth/RouteGuard";

export default function OrdersPage() {
  return (
    <RouteGuard allowedRoles={["SELLER", "ADMIN"]}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer Orders</h1>
          <p className="text-sm text-gray-600 mt-1">
            View and manage incoming customer orders.
          </p>
        </div>

        <Suspense fallback={<Spinner animation="border" className="mx-auto" />}>
          <OrdersList />
        </Suspense>
      </div>
    </RouteGuard>
  );
}
