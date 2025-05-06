import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, OrderStatus } from "@prisma/client";
import {
  CreateOrderSchema,
  UpdateOrderSchema,
} from "@/lib/validation/orderSchemas";

const prisma = new PrismaClient();

// POST /api/checkout — Create Order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { buyerId, cartItems, shippingAddress, paymentMethod } = parsed.data;

    // Calculate total amount for the order
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Use a transaction to ensure atomicity
    const order = await prisma.$transaction(async (tx) => {
      // Ensure all productIds are valid by fetching the products
      const productPromises = cartItems.map((item) =>
        tx.product.findUnique({
          where: { id: item.productId },
        })
      );
      const products = await Promise.all(productPromises);

      // Check if all products exist
      for (const product of products) {
        if (!product) {
          throw new Error("One or more products not found.");
        }
      }

      // Defensive: check first product is not null
      const firstProduct = products[0];
      if (!firstProduct) {
        throw new Error("No products found in cart.");
      }
      const sellerId = firstProduct.accountId;
      if (!sellerId) {
        throw new Error("Seller ID not found for the product(s).");
      }

      // Create the order along with associated order items
      return await tx.order.create({
        data: {
          buyerId,
          sellerId,
          status: OrderStatus.PENDING,
          shippingAddress,
          paymentMethod,
          totalPrice: totalAmount,
          items: cartItems,
          orderItems: {
            create: cartItems.map((item) => ({
              accountId: buyerId,
              product: {
                connect: { id: item.productId },
              },
              sku: item.sku,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { orderItems: true },
      });
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process checkout." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET /api/checkout?buyerId=xxx
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const buyerId = searchParams.get("buyerId");

    if (!buyerId) {
      return NextResponse.json(
        { success: false, error: "Missing buyerId" },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { buyerId },
      include: { orderItems: true },
    });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Get Orders Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve orders." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT /api/checkout — Update Order Status
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = UpdateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { orderId, status } = parsed.data;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("Update Order Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order status." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE /api/checkout?id=xxx
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Missing orderId" },
        { status: 400 }
      );
    }

    await prisma.order.delete({ where: { id: orderId } });

    return NextResponse.json(
      { success: true, message: "Order deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Order Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete order." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
