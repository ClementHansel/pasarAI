import { db } from "@/lib/db/db";
import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    // Destructure request body
    const {
      orderIdToUpdate,
      status,
      user, // The user passed in the request (assuming user is an ID or username)
      cancelReason,
    }: {
      orderIdToUpdate: string;
      status: OrderStatus;
      user: string;
      cancelReason?: string;
    } = await req.json();

    // Check for missing data
    if (!orderIdToUpdate || !status || !user) {
      return NextResponse.json(
        { message: "Missing required data to update order status" },
        { status: 400 }
      );
    }

    // Fetch the account details from the database
    const account = await db.account.findUnique({
      where: { id: user }, // Assuming 'user' is the account ID
    });

    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }

    // Execute transaction to update order and create audit log
    const updatedOrder = await db.$transaction(async (tx) => {
      const existingOrder = await tx.order.findUnique({
        where: { id: orderIdToUpdate },
      });

      if (!existingOrder) {
        throw new Error("Order not found");
      }

      // Check if order can be canceled (only pending orders)
      if (
        status === OrderStatus.CANCELLED &&
        existingOrder.status !== OrderStatus.PENDING
      ) {
        throw new Error("Only pending orders can be canceled");
      }

      // Update the order status
      const orderUpdate = await tx.order.update({
        where: { id: orderIdToUpdate },
        data: {
          status,
          cancelReason:
            status === OrderStatus.CANCELLED
              ? cancelReason || "No reason provided"
              : null,
        },
      });

      // Create an audit log with the account details
      await tx.auditLog.create({
        data: {
          action:
            status === OrderStatus.CANCELLED
              ? "CANCEL_ORDER"
              : "UPDATE_ORDER_STATUS",
          orderId: orderIdToUpdate,
          account: {
            connect: { id: account.id }, // Connect the account via the ID
          },
          reason: cancelReason,
        },
      });

      return orderUpdate;
    });

    // Return the updated order in the response
    return NextResponse.json(updatedOrder);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { message },
      { status: message === "Order not found" ? 404 : 500 }
    );
  }
}
