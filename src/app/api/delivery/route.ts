// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db/db";
// import { z } from "zod";
// import { useSession } from "next-auth/react";
// import { Prisma } from "@prisma/client";

// // Define the schema for validation if needed
// const OrderQuerySchema = z.object({
//   status: z
//     .enum(["AWAITING_PICKUP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"])
//     .optional(),
//   fromDate: z.string().optional(),
//   toDate: z.string().optional(),
// });

// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const searchParams = url.searchParams;

//     // Extract accountId from session, or fallback to search params if needed
//     const accountId = searchParams.get("sellerId");

//     if (!accountId) {
//       return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
//     }

//     // Validate the query params (status, fromDate, toDate)
//     const { status, fromDate, toDate } = OrderQuerySchema.parse({
//       status: searchParams.get("status"),
//       fromDate: searchParams.get("from"),
//       toDate: searchParams.get("to"),
//     });

//     const where: Prisma.OrderWhereInput = {
//       accountId, // Filtering by accountId
//       status: {
//         in: status
//           ? [status]
//           : ["AWAITING_PICKUP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"],
//       },
//     };

//     if (fromDate && toDate) {
//       where.createdAt = {
//         gte: new Date(fromDate),
//         lte: new Date(toDate),
//       };
//     }

//     const orders = await db.order.findMany({
//       where,
//     });

//     return NextResponse.json(orders, { status: 200 });
//   } catch (error) {
//     console.error("[DELIVERY_GET_ERROR]", error);

//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: "Invalid query parameters", details: error.errors },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { error: "Failed to fetch delivery orders" },
//       { status: 500 }
//     );
//   }
// });
