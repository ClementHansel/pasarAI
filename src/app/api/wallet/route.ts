import { PaymentStatus, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch wallet and transactions
export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.json(
      { error: "Account ID is required" },
      { status: 400 }
    );
  }

  try {
    const wallet = await prisma.wallet.findUnique({
      where: { accountId },
      include: {
        transactions: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    return NextResponse.json(wallet);
  } catch (error) {
    console.error("GET Wallet Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create transaction and update wallet
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accountId, amount, type, method } = body;

  if (!accountId || !amount || !type || !method) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  try {
    const wallet = await prisma.wallet.findUnique({ where: { accountId } });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    let newBalance = wallet.balance;

    if (type === "withdraw" || type === "bills") {
      if (numericAmount > wallet.balance) {
        return NextResponse.json(
          { error: "Insufficient balance" },
          { status: 400 }
        );
      }
      newBalance -= numericAmount;
    } else {
      newBalance += numericAmount;
    }

    // Create the transaction, including the account field explicitly
    const transaction = await prisma.transaction.create({
      data: {
        accountId,
        amount: numericAmount,
        type,
        status: PaymentStatus.COMPLETED,
        method, // Include the method field (e.g., 'card', 'bank', etc.)
        wallet: { connect: { accountId } }, // Link to the wallet
        account: { connect: { id: accountId } }, // Connect the account explicitly
      },
    });

    // Update the wallet balance
    await prisma.wallet.update({
      where: { accountId },
      data: { balance: newBalance },
    });

    return NextResponse.json({ transaction, balance: newBalance });
  } catch (error) {
    console.error("POST Wallet Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Update wallet info
export async function PUT(req: NextRequest) {
  const { id, balance, currency } = await req.json();

  if (!id || balance === undefined || !currency) {
    return NextResponse.json(
      { error: "id, balance, and currency are required" },
      { status: 400 }
    );
  }

  try {
    const wallet = await prisma.$transaction(async (tx) => {
      const existing = await tx.wallet.findUnique({ where: { id } });

      if (!existing) {
        throw new Error("Wallet not found");
      }

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

    return NextResponse.json(wallet);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update wallet";
    const status = message === "Wallet not found" ? 404 : 500;
    console.error("PUT Wallet Error:", error);
    return NextResponse.json({ error: message }, { status });
  }
}

// DELETE: Remove wallet
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Wallet ID is required" },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.$transaction(async (tx) => {
      const existing = await tx.wallet.findUnique({ where: { id } });

      if (!existing) {
        throw new Error("Wallet not found");
      }

      const deletedWallet = await tx.wallet.delete({ where: { id } });

      await tx.walletTransactionLog.create({
        data: {
          walletId: deletedWallet.id,
          action: "DELETE",
          oldValue: existing,
        },
      });

      return deletedWallet;
    });

    return NextResponse.json(deleted);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete wallet";
    const status = message === "Wallet not found" ? 404 : 500;
    console.error("DELETE Wallet Error:", error);
    return NextResponse.json({ error: message }, { status });
  }
}
