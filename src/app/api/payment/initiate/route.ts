<<<<<<< HEAD
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";
import type { Prisma, Wallet } from "@prisma/client";
import { z } from "zod";

// Simple memory-based rate limiting
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;

// Zod Schema for request body validation
const transactionSchema = z.object({
  action: z.enum(["top-up", "withdraw", "payment"]),
  accountId: z.string().min(1),
  amount: z.number().positive(),
  method: z.string().min(1),
  transactionId: z.string().optional(),
});

// Rate limiting check
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) return true;

  rateLimitMap.set(ip, { count: record.count + 1, lastRequest: now });
  return false;
}

// Function to create a transaction log
async function createTransactionLog(
  tx: Prisma.TransactionClient,
  accountId: string,
  Type: "top-up" | "withdraw" | "payment",
  amount: number,
  method: string,
  status: "SUCCESS" | "FAILED" | "PENDING" = "SUCCESS",
  transactionId?: string,
  description?: string
) {
  return await tx.transaction.create({
    data: {
      accountId,
      Type,
      amount,
      method,
      transactionId,
      status,
      description,
      paymentDate: new Date(),
      walletId: 1, // Assuming walletId is 1, update when increase wallet type
    },
  });
}

// Dispatch events to external systems
async function dispatchEvent(event: string, payload: Record<string, unknown>) {
  console.log(`[EVENT]: ${event}`, payload);
}

// Check if a withdrawal is suspicious
async function isSuspiciousWithdrawal(
  accountId: string,
  amount: number
): Promise<boolean> {
  const recent = await db.transaction.findMany({
    where: {
      accountId,
      Type: "withdraw",
      createdAt: {
        gte: new Date(Date.now() - 60 * 60 * 1000), // Last hour
      },
    },
  });

  const total = recent.reduce((sum, tx) => sum + tx.amount, 0);
  return total + amount > 5000;
}

// POST request handler
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  // Check rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: z.infer<typeof transactionSchema>;
  try {
    // Parse and validate the request body using Zod
    body = transactionSchema.parse(await req.json());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { action, accountId, amount, method, transactionId } = body;

  let updatedWallet: Wallet | null = null;

  try {
    const wallet = await db.wallet.findUnique({
      where: { accountId },
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    await db.$transaction(async (tx) => {
      switch (action) {
        case "top-up":
          updatedWallet = await tx.wallet.update({
            where: { accountId },
            data: { balance: { increment: amount } },
          });
          await createTransactionLog(
            tx,
            accountId,
            "top-up",
            amount,
            method,
            "SUCCESS",
            transactionId
          );
          await dispatchEvent("transaction.topup", { accountId, amount });
          break;

        case "withdraw":
          if (wallet.balance < amount) {
            await createTransactionLog(
              tx,
              accountId,
              "withdraw",
              amount,
              method,
              "FAILED",
              transactionId,
              "Insufficient balance"
            );
            throw new Error("Insufficient balance");
          }

          if (await isSuspiciousWithdrawal(accountId, amount)) {
            await dispatchEvent("fraud.alert", {
              accountId,
              amount,
              reason: "High withdrawal volume in short time",
            });
          }

          updatedWallet = await tx.wallet.update({
            where: { accountId },
            data: { balance: { decrement: amount } },
          });

          await createTransactionLog(
            tx,
            accountId,
            "withdraw",
            amount,
            method,
            "SUCCESS",
            transactionId
          );
          await dispatchEvent("transaction.withdraw", { accountId, amount });
          break;

        case "payment":
          if (wallet.balance < amount) {
            await createTransactionLog(
              tx,
              accountId,
              "payment",
              amount,
              method,
              "FAILED",
              transactionId,
              "Insufficient balance"
            );
            throw new Error("Insufficient balance");
          }

          updatedWallet = await tx.wallet.update({
            where: { accountId },
            data: { balance: { decrement: amount } },
          });

          await createTransactionLog(
            tx,
            accountId,
            "payment",
            amount,
            method,
            "SUCCESS",
            transactionId
          );
          await dispatchEvent("transaction.payment", { accountId, amount });
          break;

        default:
          throw new Error("Invalid action");
      }
    });

    if (updatedWallet) {
      return NextResponse.json({ balance: (updatedWallet as Wallet).balance });
    } else {
      return NextResponse.json(
        { error: "Transaction failed unexpectedly (updatedWallet is null)" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Transaction error:", error);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
=======
// src/app/api/payment/initiate/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Example: Validate input
  if (!body.amount || !body.method) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Mock payment logic
  const paymentId = Math.random().toString(36).substring(2);

  return NextResponse.json({
    message: "Payment initiated",
    paymentId,
    amount: body.amount,
    method: body.method,
  });
>>>>>>> ff1ef1814698ce0c5428aeb9f757c077851f05cb
}
