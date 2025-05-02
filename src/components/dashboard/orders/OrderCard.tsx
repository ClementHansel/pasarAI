// src/components/orders/OrderCard.tsx

import { formatDate } from "@/lib/utils";
import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 border rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">
            Date: {formatDate(order.createdAt)}
          </p>
          <p className="text-sm text-gray-500">Buyer: {order.accountName}</p>
          <p className="text-sm text-gray-500">
            Status: <span className="font-medium">{order.status}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">
            ${order.totalAmount.toFixed(2)}
          </p>
          <button className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
