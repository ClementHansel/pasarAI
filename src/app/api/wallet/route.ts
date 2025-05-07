import {
  PrismaClient,
  WalletTransactionType,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// --- Types ---
interface WalletUpdatePayload {
  id: number;
  balance: number;
  currency: string;
}

interface WalletDeletePayload {
  id: number;
}

interface CreateTransactionPayload {
  accountId: string;
  amount: number;
  type: WalletTransactionType;
  method: PaymentMethod;
}

// --- Helpers ---
const errorResponse = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

const validateAmount = (amount: string | number): number | null => {
  const num = Number(amount);
  return isNaN(num) || num <= 0 ? null : num;
};

// --- GET: Fetch wallet and transactions ---
export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get("accountId");

  if (!accountId) return errorResponse("Account ID is required");

  try {
    const wallet = await prisma.wallet.findUnique({
      where: { accountId },
      include: {
        transactions: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!wallet) return errorResponse("Wallet not found", 404);

    return NextResponse.json(wallet);
  } catch (error) {
    console.error("GET Wallet Error:", error);
    return errorResponse("Internal server error", 500);
  }
}

// --- POST: Create transaction and update balance ---
export async function POST(req: NextRequest) {
  const { accountId, amount, type, method } =
    (await req.json()) as Partial<CreateTransactionPayload>;

  if (!accountId || !amount || !type || !method) {
    return errorResponse("Missing required fields");
  }

  const numericAmount = validateAmount(amount);
  if (!numericAmount) return errorResponse("Invalid amount");

  try {
    const wallet = await prisma.wallet.findUnique({ where: { accountId } });
    if (!wallet) return errorResponse("Wallet not found", 404);

    let newBalance = wallet.balance;

    if (["WITHDRAW", "BILLS"].includes(type)) {
      if (numericAmount > newBalance) {
        return errorResponse("Insufficient balance");
      }
      newBalance -= numericAmount;
    } else {
      newBalance += numericAmount;
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const createdTx = await tx.transaction.create({
        data: {
          accountId,
          walletId: wallet.id,
          amount: numericAmount,
          type,
          method,
          status: PaymentStatus.COMPLETED,
        },
      });

      await tx.wallet.update({
        where: { accountId },
        data: { balance: newBalance },
      });

      await tx.walletTransactionLog.create({
        data: {
          walletId: wallet.id,
          action: type,
          oldValue: wallet,
          newValue: { ...wallet, balance: newBalance },
        },
      });

      return createdTx;
    });

    return NextResponse.json({ transaction, balance: newBalance });
  } catch (error) {
    console.error("POST Wallet Error:", error);
    return errorResponse("Internal server error", 500);
  }
}

// --- PUT: Update wallet and log changes ---
export async function PUT(req: NextRequest) {
  const { id, balance, currency } = (await req.json()) as WalletUpdatePayload;

  if (!id || balance === undefined || !currency) {
    return errorResponse("id, balance, and currency are required");
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.wallet.findUnique({ where: { id } });
      if (!existing) throw new Error("Wallet not found");

      const updated = await tx.wallet.update({
        where: { id },
        data: { balance, currency },
      });

      await tx.walletTransactionLog.create({
        data: {
          walletId: id,
          action: "UPDATE",
          oldValue: existing,
          newValue: updated,
        },
      });

      return updated;
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update wallet";
    const status = message === "Wallet not found" ? 404 : 500;
    console.error("PUT Wallet Error:", error);
    return errorResponse(message, status);
  }
}

// --- DELETE: Delete wallet and log deletion ---
export async function DELETE(req: NextRequest) {
  const { id } = (await req.json()) as WalletDeletePayload;

  if (!id) return errorResponse("Wallet ID is required");

  try {
    const deleted = await prisma.$transaction(async (tx) => {
      const existing = await tx.wallet.findUnique({ where: { id } });
      if (!existing) throw new Error("Wallet not found");

      const deletedWallet = await tx.wallet.delete({ where: { id } });

      await tx.walletTransactionLog.create({
        data: {
          walletId: id,
          action: "DELETE",
          oldValue: existing,
        },
      });

      return deletedWallet;
    });

    return NextResponse.json(deleted);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete wallet";
    const status = message === "Wallet not found" ? 404 : 500;
    console.error("DELETE Wallet Error:", error);
    return errorResponse(message, status);
  }
}
