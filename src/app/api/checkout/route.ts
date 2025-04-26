<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, OrderStatus } from "@prisma/client";
import {
  CreateOrderSchema,
  UpdateOrderSchema,
} from "@/lib/validation/orderSchemas";
=======
// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, OrderStatus } from "@prisma/client";
>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb

const prisma = new PrismaClient();

// POST /api/checkout — Create Order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
<<<<<<< HEAD
    const parsed = CreateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { buyerId, cartItems, shippingAddress, paymentMethod } = parsed.data;

    // Calculate total amount for the order
=======
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

>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

<<<<<<< HEAD
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

      // Create the order along with associated order items
      return await tx.order.create({
        data: {
          buyerId,
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
=======
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
>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
  }
}
