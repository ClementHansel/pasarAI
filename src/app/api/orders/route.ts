import { NextResponse } from "next/server";

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

// In-memory order store (replace with a real database)
const ordersStore = new Map<string, Order>();
const auditLogs: AuditLog[] = [];

// Get order by ID
const getOrderById = (orderId: string): Order | undefined =>
  ordersStore.get(orderId);

// Log action to audit
const logAudit = (
  action: string,
  orderId: string,
  user: string,
  reason?: string
) => {
  const timestamp = new Date().toISOString();
  auditLogs.push({ action, orderId, user, reason, timestamp });
};

// PATCH method for updating order status
export async function PATCH(req: Request) {
  try {
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
    } = await req.json();

    if (!orderIdToUpdate || !status || !user) {
      return NextResponse.json(
        { message: "Missing required data to update order status" },
        { status: 400 }
      );
    }

    const orderToUpdate = getOrderById(orderIdToUpdate);
    if (!orderToUpdate) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (status === "canceled" && orderToUpdate.status !== "pending") {
      return NextResponse.json(
        { message: "Only pending orders can be canceled" },
        { status: 400 }
      );
    }

    orderToUpdate.status = status;
    if (status === "canceled") {
      orderToUpdate.cancelReason = cancelReason || "No reason provided";
      logAudit("CANCEL_ORDER", orderIdToUpdate, user, cancelReason);
    }

    ordersStore.set(orderIdToUpdate, orderToUpdate);

    return NextResponse.json(orderToUpdate);
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
