import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Define the schema for query parameters
const OrderQuerySchema = z.object({
  status: z
    .enum(["AWAITING_PICKUP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"])
    .optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Parse and handle query parameters, treating empty or null values as undefined
    const { status, fromDate, toDate } = OrderQuerySchema.parse({
      status: searchParams.get("status") || undefined,
      fromDate: searchParams.get("from") || undefined,
      toDate: searchParams.get("to") || undefined,
    });

    // Build the `where` clause for Prisma based on the query parameters
    const where: Prisma.OrderWhereInput = {};

    if (status) {
      where.status = { in: [status] };
    } else {
      where.status = {
        in: ["AWAITING_PICKUP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"],
      };
    }

    // Include date filtering if both fromDate and toDate are provided
    if (fromDate && toDate) {
      where.createdAt = {
        gte: new Date(fromDate),
        lte: new Date(toDate),
      };
    }

    // Fetch the orders from the database
    const orders = await db.order.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return the fetched orders
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("[DELIVERY_GET_ERROR]", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }

    // Return a generic error if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch delivery orders" },
      { status: 500 }
    );
  }
}
