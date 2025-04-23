import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch wallet details by user ID
export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const wallet = await prisma.wallet.findFirst({
      where: { accountId: accountId },
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    return NextResponse.json(wallet);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet" },
      { status: 500 }
    );
  }
}

// POST: Create a new wallet
export async function POST(req: NextRequest) {
  const { accountId, balance, currency } = await req.json();

  if (!accountId || balance === undefined || !currency) {
    return NextResponse.json(
      { error: "Account ID, balance, and currency are required" },
      { status: 400 }
    );
  }

  try {
    const newWallet = await prisma.wallet.create({
      data: {
        accountId,
        balance,
        currency,
      },
    });

    return NextResponse.json(newWallet, { status: 201 });
  } catch (error) {
    console.error("Error creating wallet:", error);
    return NextResponse.json(
      { error: "Failed to create wallet" },
      { status: 500 }
    );
  }
}

// PUT: Update wallet details
export async function PUT(req: NextRequest) {
  const { id, balance, currency } = await req.json();

  if (!id || balance === undefined || !currency) {
    return NextResponse.json(
      { error: "ID, balance, and currency are required" },
      { status: 400 }
    );
  }

  try {
    const updatedWallet = await prisma.wallet.update({
      where: { id },
      data: {
        balance,
        currency,
      },
    });

    return NextResponse.json(updatedWallet);
  } catch (error) {
    console.error("Error updating wallet:", error);
    return NextResponse.json(
      { error: "Failed to update wallet" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a wallet
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Wallet ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedWallet = await prisma.wallet.delete({
      where: { id },
    });

    return NextResponse.json(deletedWallet);
  } catch (error) {
    console.error("Error deleting wallet:", error);
    return NextResponse.json(
      { error: "Failed to delete wallet" },
      { status: 500 }
    );
  }
}
