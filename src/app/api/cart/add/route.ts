// src/app/api/cart/add/route.ts

import { CartItemSchema, UpdateCartSchema } from "@/lib/validation/cartSchemas";
import { db } from "@/lib/db/db";
// import { getSession } from "@/lib/session/session";  // Commented out session import
import { emitAnalyticsEvent } from "@/lib/utils/analytics";
import { NextApiRequest, NextApiResponse } from "next";
import { rateLimiter } from "@/lib/rateLimiter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const session = await getSession(req);  // Commented out session retrieval
    // const accountId = session?.account?.id; // Fix this after setting session from Andreas

    // Commented out session-based check
    // if (!accountId) {
    //   return res.status(401).json({
    //     code: "UNAUTHORIZED",
    //     message: "Unauthorized access",
    //   });
    // }

    // Simulated accountId for testing purposes (remove in production)
    const accountId = "test_account_id"; // Replace with actual logic later

    await rateLimiter(accountId);

    switch (req.method) {
      case "POST":
        return await handlePost(req, res, accountId);
      case "PATCH":
        return await handlePatch(req, res, accountId);
      default:
        return res.status(405).json({
          code: "METHOD_NOT_ALLOWED",
          message: "Method not allowed",
        });
    }
  } catch (error) {
    console.error("Cart Add API Error:", error);
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  accountId: string
) {
  const parse = CartItemSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      code: "INVALID_CART_ITEM",
      message: "Validation failed",
      errors: parse.error.errors,
    });
  }

  const { productId, quantity } = parse.data;

  const result = await db.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (quantity > product.stock) {
      throw new Error("EXCEEDS_STOCK");
    }

    const existingItem = await tx.cartItem.findUnique({
      where: { accountId_productId: { accountId, productId } },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        throw new Error("EXCEEDS_STOCK");
      }
      const updatedItem = await tx.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });

      emitAnalyticsEvent({
        action: "updated",
        eventName: "cart_item_updated",
        widgetId: `product-${productId}`,
        widgetType: "cart_item",
        accountId,
        metadata: { productId, newQuantity },
      });

      return updatedItem;
    } else {
      const newItem = await tx.cartItem.create({
        data: { accountId, productId, quantity },
      });

      emitAnalyticsEvent({
        action: "updated",
        eventName: "cart_item_added",
        widgetId: `product-${productId}`,
        widgetType: "cart_item",
        accountId,
        metadata: { productId, quantity },
      });

      return newItem;
    }
  });

  return res.status(200).json(result);
}

async function handlePatch(
  req: NextApiRequest,
  res: NextApiResponse,
  accountId: string
) {
  const parse = UpdateCartSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      code: "INVALID_UPDATE_DATA",
      message: "Validation failed",
      errors: parse.error.errors,
    });
  }

  const { productId, newQuantity } = parse.data;

  const result = await db.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (newQuantity > product.stock) {
      throw new Error("EXCEEDS_STOCK");
    }

    const existingItem = await tx.cartItem.findUnique({
      where: { accountId_productId: { accountId, productId } },
    });

    if (!existingItem) {
      throw new Error("CART_ITEM_NOT_FOUND");
    }

    const updatedItem = await tx.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: newQuantity },
    });

    emitAnalyticsEvent({
      action: "updated",
      eventName: "cart_item_updated",
      widgetId: `product-${productId}`,
      widgetType: "cart_item",
      accountId,
      metadata: { productId, newQuantity },
    });

    return updatedItem;
  });

  return res.status(200).json(result);
}

export default handler;
