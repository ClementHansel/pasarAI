// src/app/api/voucher/redeem/route.ts
import { db } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Voucher code is required." },
        { status: 400 }
      );
    }

    // Use Prisma transaction for atomic and safe update
    const result = await db.$transaction(async (tx) => {
      const voucher = await tx.voucher.findUnique({
        where: { code },
      });

      if (
        !voucher ||
        !voucher.isActive ||
        voucher.isRedeemed ||
        (voucher.expiryDate && new Date() > voucher.expiryDate)
      ) {
        throw new Error("Voucher is invalid, expired, or already redeemed.");
      }

      const redeemedVoucher = await tx.voucher.update({
        where: { id: voucher.id },
        data: {
          isRedeemed: true,
          isActive: false,
          redeemedAt: new Date(),
        },
      });

      return redeemedVoucher;
    });

    return NextResponse.json({
      message: "Voucher redeemed successfully.",
      voucher: {
        id: result.id,
        code: result.code,
        discount: result.discount,
        value: result.value,
        type: result.type,
        redeemedAt: result.redeemedAt,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error redeeming voucher:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
