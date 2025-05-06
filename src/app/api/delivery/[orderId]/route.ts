import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: { orderId: string } }
) => {
  const { orderId } = params;
  // Placeholder user object; replace with actual auth logic
  const user = { id: "user-id-placeholder", role: "ADMIN" };
  const { status } = await req.json();

  try {
    // Placeholder order fetch; replace with actual DB call
    const order = {
      id: orderId,
      accounts: [{ role: "SELLER", accountId: user.id }],
    };
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Authorization check
    const isSellerOfOrder = order.accounts.some(
      (a: { role: string; accountId: string }) =>
        a.role === "SELLER" && a.accountId === user.id
    );
    if (user.role !== "ADMIN" && !isSellerOfOrder) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Placeholder update; replace with actual DB update
    const updatedOrder = { ...order, status };

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("[DELIVERY_PUT_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
};
