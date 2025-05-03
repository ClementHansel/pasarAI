import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";
import { withSellerAuth } from "@/lib/middleware";
import { UserRequest } from "@/types/api";

export async function GET(request: UserRequest) {
  const { searchParams } = new URL(request.url);
  const metric = searchParams.get("metric");

  const sellerId = request.user?.id;

  if (!sellerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    switch (metric) {
      case "activeUsers":
      case "churnRate":
      case "acquisitionCost":
      case "customerGrowth":
      case "lifetimeValue":
      case "retentionRate":
      case "newVsReturning": {
        const selectFields: Record<string, object> = {
          activeUsers: { date: true, activeUsers: true },
          churnRate: { date: true, churnRate: true },
          acquisitionCost: { date: true, acquisitionCost: true },
          customerGrowth: { date: true, newCustomers: true },
          lifetimeValue: { date: true, lifetimeValue: true },
          retentionRate: { date: true, retentionRate: true },
          newVsReturning: {
            date: true,
            newCustomerCount: true,
            returningCustomerCount: true,
          },
        };

        return NextResponse.json(
          await db.customerMetric.findMany({
            where: { accountId: sellerId }, // Replace sellerId with accountId
            select: selectFields[metric],
            orderBy: { date: "asc" },
          })
        );
      }

      case "topCustomers": {
        try {
          // Fetch top customers by total spending (grouped by buyerId)
          const topCustomers = await db.order.groupBy({
            by: ["buyerId"],
            _sum: {
              totalPrice: true,
            },
            where: {
              sellerId: sellerId, // Direct relation if sellerId exists in order
              createdAt: {
                gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // last 30 days
              },
            },
            orderBy: {
              _sum: {
                totalPrice: "desc",
              },
            },
            take: 10,
          });

          const accountIds = topCustomers.map((c) => c.buyerId);
          const accountDetails = await db.account.findMany({
            where: {
              id: { in: accountIds },
              role: "BUYER",
            },
            select: {
              id: true,
              name: true,
            },
          });

          const result = topCustomers.map((customer) => {
            const account = accountDetails.find(
              (a) => a.id === customer.buyerId
            );
            return {
              name: account?.name ?? "Unknown",
              value: customer._sum.totalPrice,
            };
          });

          return NextResponse.json(result);
        } catch (error) {
          console.error("Top Customers Error:", error);
          return NextResponse.json(
            { error: "Failed to fetch top customers." },
            { status: 500 }
          );
        }
      }

      default:
        return NextResponse.json({ error: "Invalid metric" }, { status: 400 });
    }
  } catch (error) {
    console.error("CustomerInsights API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const handler = withSellerAuth(GET);
