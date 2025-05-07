// src/app/api/cart/sync/route.ts

import {
  BulkRemoveCartSchema,
  SingleRemoveCartSchema,
} from "@/lib/validation/cartSchemas";
import { db } from "@/lib/db/db";
// import { getSession } from "@/lib/session/session"; // Commented out session import
import { emitAnalyticsEvent } from "@/lib/utils/analytics";
import { NextApiRequest, NextApiResponse } from "next";
import { isAPIError } from "@/lib/utils/errorUtils";

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

    if (req.method !== "DELETE") {
      return res.status(405).json({
        code: "METHOD_NOT_ALLOWED",
        message: "Method not allowed",
      });
    }

    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        code: "INVALID_DELETE_DATA",
        message: "Request body must be an object",
      });
    }

    const { clearAll, productId, productIds } = req.body;

    await db.$transaction(async (tx) => {
      if (clearAll) {
        await tx.cartItem.deleteMany({ where: { accountId } });

        emitAnalyticsEvent({
          action: "deleted",
          eventName: "cart_items_cleared",
          widgetId: `cart-${accountId}`,
          widgetType: "cart",
          accountId,
          metadata: {},
        });

        return res.status(200).json({ message: "All cart items cleared." });
      }

      if (productId) {
        const parse = SingleRemoveCartSchema.safeParse({ productId });
        if (!parse.success) {
          throw {
            status: 400,
            code: "INVALID_SINGLE_DELETE_DATA",
            errors: parse.error.errors,
          };
        }

        const existingItem = await tx.cartItem.findFirst({
          where: { accountId, productId: parse.data.productId },
        });

        if (!existingItem) {
          throw {
            status: 404,
            code: "CART_ITEM_NOT_FOUND",
            message: "Item not found in cart.",
          };
        }

        await tx.cartItem.delete({
          where: { id: existingItem.id },
        });

        emitAnalyticsEvent({
          action: "deleted",
          eventName: "cart_item_deleted",
          widgetId: `cart-${accountId}`,
          widgetType: "cart",
          accountId,
          metadata: { productId },
        });

        return res.status(200).json({ message: "Item removed from cart." });
      }

      if (productIds && Array.isArray(productIds)) {
        const parse = BulkRemoveCartSchema.safeParse({ productIds });
        if (!parse.success) {
          throw {
            status: 400,
            code: "INVALID_BULK_DELETE_DATA",
            errors: parse.error.errors,
          };
        }

        const items = await tx.cartItem.findMany({
          where: {
            accountId,
            productId: { in: parse.data.productIds },
          },
          select: { id: true },
        });

        if (items.length !== parse.data.productIds.length) {
          throw {
            status: 404,
            code: "CART_ITEM_NOT_FOUND",
            message: "One or more items not found.",
          };
        }

        await tx.cartItem.deleteMany({
          where: {
            id: { in: items.map((item) => item.id) },
          },
        });

        emitAnalyticsEvent({
          action: "deleted",
          eventName: "cart_items_bulk_deleted",
          widgetId: `cart-${accountId}`,
          widgetType: "cart",
          accountId,
          metadata: { productIds },
        });

        return res.status(200).json({ message: "Items removed from cart." });
      }

      throw {
        status: 400,
        code: "INVALID_DELETE_DATA",
        message:
          "Invalid delete request: Provide clearAll, productId, or productIds",
      };
    });
  } catch (error: unknown) {
    if (isAPIError(error)) {
      console.error("Cart Sync Error:", {
        error,
        accountId: error.accountId || "unknown",
      });

      return res.status(error.status).json({
        code: error.code || "UNKNOWN_ERROR",
        message: error.message || "Bad request",
        errors: error.errors || undefined,
      });
    } else {
      console.error("Unknown error:", error);
      return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      });
    }
  }
};

export default handler;
