// src/app/api/cart/route.ts

import { db } from "@/lib/db/db";
// import { getSession } from "@/lib/session/session"; // Commented out session import
import { emitAnalyticsEvent } from "@/lib/utils/analytics";
import { z } from "zod"; // Import Zod for validation
import { NextApiRequest, NextApiResponse } from "next";
import { rateLimiter } from "@/lib/rateLimiter";

const CART_PAGE_SIZE = 20;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const session = await getSession(req); // Commented out session retrieval
    // const accountId = session?.account?.id; // Fix this after setting session from Andreas

    // Commented out session-based check
    // if (!accountId) {
    //   return res
    //     .status(401)
    //     .json({ code: "UNAUTHORIZED", message: "Unauthorized access" });
    // }

    // Simulated accountId for testing purposes (remove in production)
    const accountId = "test_account_id"; // Replace with actual logic later

    await rateLimiter(accountId);

    if (req.method !== "GET") {
      // Only allow GET here, modification logic should go to /cart/sync
      return res
        .status(405)
        .json({ code: "METHOD_NOT_ALLOWED", message: "Method not allowed" });
    }

    // Validate and parse the `page` query parameter
    const pageSchema = z
      .string()
      .regex(/^\d+$/, { message: "Page must be a positive integer" })
      .transform(Number)
      .default("1");

    const pageResult = pageSchema.safeParse(req.query.page);

    if (!pageResult.success) {
      return res.status(400).json({
        code: "INVALID_QUERY_PARAMS",
        message: "Invalid page parameter",
        errors: pageResult.error.errors,
      });
    }

    const page = pageResult.data;

    const cart = await db.cartItem.findMany({
      where: { accountId },
      skip: (page - 1) * CART_PAGE_SIZE,
      take: CART_PAGE_SIZE,
      include: { product: true },
    });

    const totalItems = await db.cartItem.count({ where: { accountId } });

    emitAnalyticsEvent({
      action: "viewed",
      eventName: "cart_viewed",
      widgetId: `cart-${accountId}`,
      widgetType: "cart",
      accountId,
      metadata: { page, totalItems },
    });

    return res.status(200).json({
      items: cart,
      totalItems,
      page,
      pageSize: CART_PAGE_SIZE,
    });
  } catch (error) {
    console.error("Cart API Error:", error);

    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export default handler;
