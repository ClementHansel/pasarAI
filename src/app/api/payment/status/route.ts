<<<<<<< HEAD
import { db } from "@/lib/db/db";
=======
// src/app/api/payment/status/route.ts

>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const paymentId = url.searchParams.get("paymentId");

  if (!paymentId) {
    return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
  }

<<<<<<< HEAD
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
      // Fetch payment status and version from the database for concurrency control
      const payment = await tx.payment.findUnique({
        where: { id: paymentIdNumber },
        select: { id: true, status: true, version: true, accountId: true },
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      // Generate a notification message
      const notificationMessage = `Payment status fetched for Payment ID: ${paymentIdNumber}, Status: ${payment.status}`;

      // Insert a record into the notifications table for tracking
      await tx.notification.create({
        data: {
          accountId: payment.accountId,
          message: notificationMessage,
          type: "PaymentStatusFetched",
          status: "Sent",
          reason: "Payment status fetched",
        },
      });

      // Return the payment status
      return payment.status;
    });

    // Return the status of the payment
    return NextResponse.json({
      paymentId: paymentIdNumber,
      status: result,
    });
  } catch (error: unknown) {
    console.error(error);

    // Handle the error properly by checking if it's an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 }
      );
    }

    // If it's not an instance of Error, return a generic error message
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { paymentId, status, version } = await req.json();

  if (!paymentId || !status || !version) {
    return NextResponse.json(
      { error: "Payment ID, status, and version required" },
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

    // Begin the database transaction for updating payment status
    const updatedPayment = await db.$transaction(async (tx) => {
      // Fetch the payment details along with its version
      const payment = await tx.payment.findUnique({
        where: { id: paymentIdNumber },
        select: { id: true, status: true, version: true, accountId: true },
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      // Check if the version has changed (Optimistic Locking)
      if (payment.version !== version) {
        throw new Error(
          "Payment has been updated by another process. Please refresh and try again."
        );
      }

      // Update the payment status and increment the version
      const updatedPayment = await tx.payment.update({
        where: { id: paymentIdNumber },
        data: {
          status,
          version: { increment: 1 }, // Increment version for concurrency control
        },
      });

      // Generate a notification message
      const notificationMessage = `Payment status updated for Payment ID: ${paymentIdNumber}, Status: ${status}`;

      // Insert a record into the notifications table
      await tx.notification.create({
        data: {
          accountId: payment.accountId,
          message: notificationMessage,
          type: "PaymentStatusUpdated",
          status: "Sent",
          reason: "Refund initiation",
        },
      });

      // Return the updated payment
      return updatedPayment;
    });

    // Return success response with updated payment details
    return NextResponse.json({
      paymentId: updatedPayment.id,
      status: updatedPayment.status,
    });
  } catch (error: unknown) {
    console.error(error);

    // Handle the error properly by checking if it's an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 }
      );
    }

    // If it's not an instance of Error, return a generic error message
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
=======
  // Mock status
  const status = "completed";

  return NextResponse.json({
    paymentId,
    status,
  });
>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
}
