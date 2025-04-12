// src/app/api/orders/route.ts
import { NextApiRequest, NextApiResponse } from "next";

// Define the Order type and Status
interface Order {
  id: string;
  status: "pending" | "shipped" | "delivered" | "canceled";
  customerId: string;
  items: { productId: string; quantity: number }[];
  createdAt: string;
  updatedAt: string;
  cancelReason?: string; // Optional cancel reason
}

// Audit log entry type
interface AuditLog {
  action: string; // Action performed (e.g., CANCEL_ORDER)
  orderId: string; // The order ID associated with the action
  user: string; // The user who performed the action (e.g., customer ID, admin ID)
  reason?: string; // Optional reason for the action (e.g., cancellation reason)
  timestamp: string; // The timestamp of when the action was performed
}

// In-memory order store for demonstration (replace with a database in production)
const ordersStore = new Map<string, Order>();

// Audit log storage (this should be stored in a database for production)
const auditLogs: AuditLog[] = [];

// Helper function to get the order by ID
const getOrderById = (orderId: string): Order | undefined =>
  ordersStore.get(orderId);

// Function to log actions
const logAudit = (
  action: string,
  orderId: string,
  user: string,
  reason?: string
) => {
  const timestamp = new Date().toISOString();
  auditLogs.push({
    action,
    orderId,
    user,
    reason,
    timestamp,
  });
};

// API Handler for Orders
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "PATCH":
      // Extract necessary data from the request body
      const {
        orderIdToUpdate,
        status,
        user,
        cancelReason,
      }: {
        orderIdToUpdate: string;
        status: "pending" | "shipped" | "delivered" | "canceled";
        user: string;
        cancelReason?: string;
      } = req.body;

      // Validate required fields
      if (!orderIdToUpdate || !status || !user) {
        return res
          .status(400)
          .json({ message: "Missing required data to update order status" });
      }

      // Fetch the order to update
      const orderToUpdate = getOrderById(orderIdToUpdate);
      if (!orderToUpdate) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Order Status Control: Only allow cancellation if the order is "pending"
      if (status === "canceled" && orderToUpdate.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Only pending orders can be canceled" });
      }

      // Update order status and reason if canceling
      orderToUpdate.status = status;
      if (status === "canceled") {
        orderToUpdate.cancelReason = cancelReason || "No reason provided";
      }

      // Log the cancellation action in the audit logs
      if (status === "canceled") {
        logAudit("CANCEL_ORDER", orderIdToUpdate, user, cancelReason);
      }

      // Save the updated order
      ordersStore.set(orderIdToUpdate, orderToUpdate);

      return res.status(200).json(orderToUpdate);

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
