import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db/db";
import { withAuth } from "@/lib/middleware";

export const GET = withAuth(
  async (req) => {
    try {
      const user = req.user;
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      let orders;

      if (user.role === "ADMIN") {
        orders = await db.order.findMany();
      } else if (user.role === "SELLER") {
        orders = await db.order.findMany({
          where: {
            sellerId: user.id as string,
          } as Prisma.OrderWhereInput,
        });
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      return NextResponse.json(orders);
    } catch (error) {
      console.error("[DELIVERY_GET_ERROR]", error);
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: 500 }
      );
    }
  },
  { allowedRoles: ["ADMIN", "SELLER"] }
);
