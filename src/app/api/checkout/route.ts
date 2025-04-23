// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/checkout — Create Order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      buyerId, // Change userId to buyerId
      cartItems,
      shippingAddress,
      paymentMethod,
    }: {
      buyerId: string; // Ensure buyerId is a string
      cartItems: {
        productId: string;
        sku: string;
        price: number;
        quantity: number;
      }[];
      shippingAddress: string;
      paymentMethod: string;
    } = body;

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        buyer: { connect: { id: buyerId } }, // Connect using buyerId
        status: "PENDING",
        shippingAddress,
        paymentMethod,
        totalPrice: totalAmount,
        orderItems: {
          create: cartItems.map((item) => ({
            product: {
              connect: {
                id: item.productId,
                sku: item.sku,
              },
            },
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { success: false, error: "Checkout failed" },
      { status: 500 }
    );
  }
}

// GET /api/checkout?buyerId=1
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const buyerId = searchParams.get("buyerId"); // Ensure this is treated as a string

    if (!buyerId) {
      return NextResponse.json({ error: "Missing buyerId" }, { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { buyerId: buyerId }, // Query by the correct buyerId field
      include: { orderItems: true },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// PUT /api/checkout - update order status
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, status }: { orderId: number; status: OrderStatus } = body;

    const order = await prisma.order.update({
      where: { id: String(orderId) },
      data: { status },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Update Order Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// DELETE /api/checkout?id=1
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = Number(searchParams.get("id"));

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    await prisma.order.delete({ where: { id: String(orderId) } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Order Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
