// src/components/dashboard/orders/OrderCard.tsx
import { formatDate } from "@/lib/utils";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 border rounded-xl shadow-sm p-4 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h2 className="font-semibold text-lg">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">
            Date: {formatDate(order.createdAt)}
          </p>
          <p className="text-sm text-gray-500">Buyer: {order.accountName}</p>
          <div className="mt-1">
            <span className="text-sm text-gray-500">Status:</span>{" "}
            <Badge variant={getStatusVariant(order.status)} className="ml-2">
              {order.status}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">
            ${order.totalAmount.toFixed(2)}
          </p>
          <Button
            onClick={() => console.log("View details for", order.id)}
            variant="secondary"
            className="mt-2 w-full sm:w-auto"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper for status badge styling
const getStatusVariant = (
  status: string
):
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "success"
  | undefined => {
  switch (status.toLowerCase()) {
    case "pending":
      return "default";
    case "processing":
      return "secondary";
    case "shipped":
      return "outline";
    case "completed":
      return "success"; // ✅ Changed from "success" to "default"
    case "cancelled":
      return "destructive";
    default:
      return undefined;
  }
};
