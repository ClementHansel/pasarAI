<<<<<<< HEAD
import { db } from "@/lib/db/db";
=======
// src/app/api/payment/refund/route.ts

>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { paymentId, reason } = await req.json();

<<<<<<< HEAD
  if (!paymentId || !reason) {
    return NextResponse.json(
      { error: "Payment ID and reason are required" },
      { status: 400 }
    );
  }

  try {
    // Convert paymentId to a number for database query
    const paymentIdNumber = parseInt(paymentId, 10);
    if (isNaN(paymentIdNumber)) {
      return NextResponse.json(
        { error: "Invalid payment ID" },
        { status: 400 }
      );
    }

    // Begin the database transaction
    const result = await db.$transaction(async (tx) => {
      // Fetch payment details for the specified paymentId
      const payment = await tx.payment.findUnique({
        where: { id: paymentIdNumber },
        select: { id: true, status: true, version: true, accountId: true },
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      // Check if the payment status allows for a refund (e.g., only "completed" payments can be refunded)
      if (payment.status !== "completed") {
        throw new Error(
          "Refund not allowed for payments that are not completed"
        );
      }

      // Generate a refund notification message
      const notificationMessage = `Refund initiated for Payment ID: ${paymentIdNumber}, Reason: ${reason}`;

      // Update the payment status to "refunded" and increment the version for concurrency control
      const updatedPayment = await tx.payment.update({
        where: { id: paymentIdNumber },
        data: {
          status: "refunded", // Mark the payment as refunded
          version: { increment: 1 }, // Increment version to prevent race conditions
        },
      });

      // Insert a record into the notifications table for tracking the refund
      await tx.notification.create({
        data: {
          accountId: payment.accountId,
          message: notificationMessage,
          type: "RefundInitiated",
          status: "pending",
          reason: reason,
        },
      });

      // Log the refund action
      await tx.paymentLog.create({
        data: {
          paymentId: payment.id,
          action: "refund",
          reason: reason,
          status: updatedPayment.status,
          description: `Refund initiated for payment ID: ${payment.id}. Reason: ${reason}`,
        },
      });

      // Return the updated payment details
      return updatedPayment;
    });

    // Return a success response with refund status
    return NextResponse.json({
      message: "Refund successfully initiated",
      paymentId: result.id,
      refunded: true,
      reason,
      status: result.status,
    });
  } catch (error: unknown) {
    console.error(error); // Log the error for debugging
    // Handle error properly with type-safe error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
=======
  if (!paymentId) {
    return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
  }

  // Mock refund logic
  return NextResponse.json({
    message: "Refund initiated",
    paymentId,
    refunded: true,
    reason,
  });
>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
}
