import { subDays, startOfDay } from "date-fns";
import { db } from "../db/db";

/**
 * Generates insight for a single seller.
 */
export async function generateCustomerInsights(accountId: string) {
  const orders = await db.order.findMany({
    where: {
      sellerId: accountId,
    },
    include: {
      buyer: true,
    },
  });

  const now = new Date();
  const last30Days = subDays(now, 30);
  const newCustomers = new Set<string>();
  const returningCustomers = new Set<string>();
  const customerOrderMap: Record<string, number> = {};

  for (const order of orders) {
    const buyerId = order.buyerId;

    if (!customerOrderMap[buyerId]) {
      customerOrderMap[buyerId] = 0;
    }

    customerOrderMap[buyerId]++;

    if (new Date(order.createdAt) >= last30Days) {
      if (customerOrderMap[buyerId] === 1) {
        newCustomers.add(buyerId);
      } else {
        returningCustomers.add(buyerId);
      }
    }
  }

  const totalCustomers = Object.keys(customerOrderMap).length;
  const retentionRate =
    totalCustomers === 0 ? 0 : (returningCustomers.size / totalCustomers) * 100;

  const churnRate = 100 - retentionRate;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const lifetimeValue =
    totalCustomers === 0 ? 0 : totalRevenue / totalCustomers;

  return {
    accountId,
    date: startOfDay(now),
    newCustomerCount: newCustomers.size,
    returningCustomerCount: returningCustomers.size,
    retentionRate,
    churnRate,
    lifetimeValue,
  };
}

/**
 * Auto-saves metrics for all sellers
 */
export async function runCustomerInsightsCron() {
  const sellers = await db.account.findMany({
    where: { role: "SELLER" },
    select: { id: true },
  });

  for (const seller of sellers) {
    try {
      const insights = await generateCustomerInsights(seller.id);

      await db.customerMetric.create({
        data: {
          accountId: insights.accountId,
          date: insights.date,
          newCustomerCount: insights.newCustomerCount,
          returningCustomerCount: insights.returningCustomerCount,
          retentionRate: insights.retentionRate,
          churnRate: insights.churnRate,
          lifetimeValue: insights.lifetimeValue,
        },
      });

      console.log(`CustomerMetric saved for seller ${seller.id}`);
    } catch (error) {
      console.error(`Failed to process seller ${seller.id}:`, error);
    }
  }
}

export async function GET() {
  try {
    await runCustomerInsightsCron();
    return new Response("Customer insights cron completed.");
  } catch (error) {
    console.error(error);
    return new Response("Error running customer insights cron", {
      status: 500,
    });
  }
}
