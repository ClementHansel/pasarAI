import { Suspense } from "react";
import OrdersList from "@/components/dashboard/orders/OrdersList";
import { Spinner } from "react-bootstrap";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Role } from "@prisma/client";

export default function OrdersPage() {
  return (
    <AuthGuard allowedRoles={[Role.SELLER]}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Customer Orders</h1>
          <h2 className="text-gray-600">
            View and manage incoming customer orders.
          </h2>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Spinner animation="border" />
            </div>
          }
        >
          <OrdersList />
        </Suspense>
      </div>
    </AuthGuard>
  );
}
