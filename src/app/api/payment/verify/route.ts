// src/app/api/payment/verify/route.ts

<<<<<<< HEAD
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

// Define the valid actions as a union type
type PaymentAction = "refund" | "cancel" | "reverse";

// Define the valid transitions object
const validTransitions: Record<PaymentAction, string[]> = {
  refund: ["COMPLETED"],
  cancel: ["PENDING", "PROCESSING"],
  reverse: ["COMPLETED", "PROCESSING"],
};

export async function POST(req: Request) {
  const {
    paymentId,
    verificationToken,
    action,
  }: { paymentId: string; verificationToken: string; action: PaymentAction } =
    await req.json();

  if (!paymentId || !verificationToken || !action) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const result = await db.$transaction(async (tx) => {
      const paymentIdNumber = parseInt(paymentId, 10); // Convert paymentId to a number

      // Check if the conversion was successful
      if (isNaN(paymentIdNumber)) {
        return NextResponse.json(
          { error: "Invalid payment ID" },
          { status: 400 }
        );
      }
      const payment = await tx.payment.findUnique({
        where: { id: paymentIdNumber },
        select: {
          id: true,
          status: true,
          version: true, // for concurrency control
          accountId: true,
        },
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      // Idempotency check
      if (
        (action === "refund" && payment.status === "REFUNDED") ||
        (action === "cancel" && payment.status === "CANCELLED") ||
        (action === "reverse" && payment.status === "REVERSED")
      ) {
        return { message: `Payment already ${action}ed`, success: true };
      }

      // Token check (replace with real logic later from andreas)
      if (verificationToken !== "demo-token") {
        throw new Error("Invalid token");
      }

      // Check if the payment status can transition to the requested action
      if (!validTransitions[action]?.includes(payment.status)) {
        throw new Error(
          `Cannot ${action} a payment with status ${payment.status}`
        );
      }

      // Update payment status
      const updated = await tx.payment.update({
        where: {
          id: payment.id,
          version: payment.version, // optimistic concurrency control
        },
        data: {
          status: action.toUpperCase(), // e.g., REFUNDED
          version: { increment: 1 }, // bump version
        },
      });

      // Log the action
      await tx.paymentLog.create({
        data: {
          paymentId: payment.id,
          action,
          description: `Payment ${action}ed`,
          reason: "Refund initiated for payment",
          status: "PENDING",
        },
      });

      // Store notification in the database
      const notificationMessage = `Your payment has been ${action}ed successfully.`;
      await tx.notification.create({
        data: {
          accountId: payment.accountId,
          message: notificationMessage,
          type: action.toUpperCase(), // Notification type based on action
          status: "PENDING", // use this to track notification status
          reason: `Payment ${action} notification sent`,
        },
      });

      return {
        message: `Payment ${action}ed successfully`,
        success: true,
        newStatus: updated.status,
      };
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    // Type narrowing for error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
=======
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { paymentId, verificationToken } = await req.json();

  if (!paymentId || !verificationToken) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // Mock verification logic
  const verified = verificationToken === "demo-token";

  return NextResponse.json({
    message: verified ? "Payment verified" : "Verification failed",
    verified,
  });
>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
}
