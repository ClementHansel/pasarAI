import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET
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
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    return NextResponse.json(wallet);
  } catch (error: unknown) {
    console.error("GET Wallet Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: NextRequest) {
  const { accountId, balance, currency } = await req.json();

  if (!accountId || balance === undefined || !currency) {
    return NextResponse.json(
      { error: "accountId, balance, and currency are required" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.wallet.findUnique({ where: { accountId } });

    if (existing) {
      return NextResponse.json(
        { error: "Wallet already exists" },
        { status: 409 }
      );
    }

    const wallet = await prisma.$transaction(async (tx) => {
      const created = await tx.wallet.create({
        data: { accountId, balance, currency },
      });

      await tx.walletTransactionLog.create({
        data: {
          walletId: created.id,
          action: "CREATE",
          newValue: created,
        },
      });

      return created;
    });

    return NextResponse.json(wallet, { status: 201 });
  } catch (error: unknown) {
    console.error("POST Wallet Error:", error);
    return NextResponse.json(
      { error: "Failed to create wallet" },
      { status: 500 }
    );
  }
}

// PUT
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

// DELETE
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
