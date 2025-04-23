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

    const voucher = await db.voucher.findUnique({
      where: { code },
    });

    if (!voucher || !voucher.isActive) {
      return NextResponse.json(
        { error: "Invalid or expired voucher." },
        { status: 404 }
      );
    }

    // Optionally: validate if voucher is expired or already used

    return NextResponse.json({
      message: "Voucher valid.",
      voucher: {
        id: voucher.id,
        code: voucher.code,
        discount: voucher.discount,
        value: voucher.value,
        type: voucher.type,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error redeeming voucher:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
