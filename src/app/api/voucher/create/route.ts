import {
  createManualVoucher,
  createReferralVouchers,
} from "@/lib/voucher/generateVoucherCode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { type, value, discount, createdBy, referrerId, referredId } = body;

    if (type === "manual") {
      if (!createdBy) {
        return NextResponse.json(
          { error: "Missing createdBy" },
          { status: 400 }
        );
      }

      const voucher = await createManualVoucher({ value, discount, createdBy });
      return NextResponse.json({ voucher }, { status: 201 });
    }

    if (type === "referral") {
      if (!referrerId || !referredId) {
        return NextResponse.json(
          { error: "Missing referrerId or referredId" },
          { status: 400 }
        );
      }

      const result = await createReferralVouchers(referrerId, referredId);
      return NextResponse.json(result, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating voucher:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
