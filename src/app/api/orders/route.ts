import { db } from "@/lib/db/db";
import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const {
      orderIdToUpdate,
      status,
      user,
      cancelReason,
    }: {
      orderIdToUpdate: string;
      status: OrderStatus;
      user: string;
      cancelReason?: string;
    } = await req.json();

    if (!orderIdToUpdate || !status || !user) {
      return NextResponse.json(
        { message: "Missing required data to update order status" },
        { status: 400 }
      );
    }

    const updatedOrder = await db.$transaction(async (tx) => {
      const existingOrder = await tx.order.findUnique({
        where: { id: orderIdToUpdate },
      });

      if (!existingOrder) {
        throw new Error("Order not found");
      }

      if (
        status === OrderStatus.CANCELLED &&
        existingOrder.status !== OrderStatus.PENDING
      ) {
        throw new Error("Only pending orders can be canceled");
      }

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

      await tx.auditLog.create({
        data: {
          action:
            status === OrderStatus.CANCELLED
              ? "CANCEL_ORDER"
              : "UPDATE_ORDER_STATUS",
          orderId: orderIdToUpdate,
          account,
          reason: cancelReason,
        },
      });

      return orderUpdate;
    });

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
