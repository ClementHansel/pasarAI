import { db } from "@/lib/db/db";
import { AuthenticatedRequest, withAdminAuth } from "@/lib/middleware";
import { OrderStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// Delivery statuses to be tracked
const DELIVERY_STATUSES: OrderStatus[] = [
  OrderStatus.AWAITING_PICKUP,
  OrderStatus.IN_TRANSIT,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
];

export const GET = withAdminAuth(async (req: AuthenticatedRequest) => {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status") as OrderStatus | null;
    const fromDate = url.searchParams.get("from");
    const toDate = url.searchParams.get("to");

    const where: Prisma.OrderWhereInput = {
      status: {
        in: status ? [status] : DELIVERY_STATUSES,
      },
    };

    if (fromDate && toDate) {
      where.createdAt = {
        gte: new Date(fromDate),
        lte: new Date(toDate),
      };
    }

    const orders = await db.order.findMany({
      where,
      // If accounts are needed, ensure the relation exists in the Prisma schema
      // include: { accounts: true },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("[DELIVERY_GET_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch delivery orders." },
      { status: 500 }
    );
  }
});
