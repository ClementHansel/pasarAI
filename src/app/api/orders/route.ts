// app/api/orders/route.ts

import { db } from "@/lib/db/db";
import { UpdateOrderSchema } from "@/lib/validation/orderSchemas";
import { OrderStatus } from "@prisma/client";
import { withAnyAuth, AuthenticatedRequest } from "@/lib/middleware";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const sellerId = req.nextUrl.searchParams.get("sellerId");

  if (!sellerId) {
    return NextResponse.json(
      { message: "Missing sellerId in query parameters." },
      { status: 400 }
    );
  }

  try {
    const orders = await db.order.findMany({
      where: {
        orderItems: {
          some: {
            product: {
              accountId: sellerId,
            },
          },
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        buyer: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[GET_SELLER_ORDERS_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch orders for seller" },
      { status: 500 }
    );
  }
};

// PATCH order status with audit logging
export const PATCH = withAnyAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const parsed = UpdateOrderSchema.safeParse(body);

    if (!parsed.success) {
      // Return validation errors if the request body is invalid
      return NextResponse.json(
        { message: "Invalid request", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { orderId, status, cancelReason } = parsed.data;
    const user = req.user!; // Get user info from the middleware

    // Start a transaction to ensure atomicity
    const updatedOrder = await db.$transaction(async (tx) => {
      const existingOrder = await tx.order.findUnique({
        where: { id: orderId },
      });

      if (!existingOrder) {
        throw new Error("Order not found");
      }

      // Check if the order can be canceled (only pending orders can be canceled)
      if (
        status === OrderStatus.CANCELLED &&
        existingOrder.status !== OrderStatus.PENDING
      ) {
        throw new Error("Only pending orders can be canceled");
      }

      // Update the order status
      const orderUpdate = await tx.order.update({
        where: { id: orderId },
        data: {
          status,
          cancelReason:
            status === OrderStatus.CANCELLED
              ? cancelReason || "No reason provided"
              : null,
        },
      });

      // Create an audit log entry for the status change
      await tx.auditLog.create({
        data: {
          action:
            status === OrderStatus.CANCELLED
              ? "CANCEL_ORDER"
              : "UPDATE_ORDER_STATUS",
          orderId,
          account: { connect: { id: user.id } }, // Link the account performing the action
          reason: cancelReason,
        },
      });

      return orderUpdate;
    });

    return NextResponse.json(updatedOrder);
  } catch (error: unknown) {
    // Handle known and unknown errors gracefully
    const message =
      error instanceof Error ? error.message : "Internal server error";
    const statusCode = message === "Order not found" ? 404 : 500;
    console.error("[PATCH_ORDER_ERROR]", error);

    return NextResponse.json({ message }, { status: statusCode });
  }
});
