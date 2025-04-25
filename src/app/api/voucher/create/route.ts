// src/app/api/voucher/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  createManualVoucher,
  createReferralVouchers,
} from "@/lib/voucher/generateVoucherCode";
import { ManualPayload, ReferralPayload } from "@/types/voucher";

type VoucherPayload = ManualPayload | ReferralPayload;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as Partial<VoucherPayload>;

  // Manual
  if (payload.type === "manual") {
    const { value, discount, createdBy } = payload as ManualPayload;

    if (
      typeof value !== "number" ||
      typeof discount !== "number" ||
      typeof createdBy !== "string"
    ) {
      return NextResponse.json(
        { error: "value, discount, and createdBy are required" },
        { status: 400 }
      );
    }

    try {
      const createdVoucher = await createManualVoucher({
        value,
        discount,
        createdBy,
      });

      return NextResponse.json({ voucher: createdVoucher }, { status: 201 });
    } catch (err: unknown) {
      console.error("Manual voucher error:", err);
      const msg = err instanceof Error ? err.message : "Internal server error";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  // Referral
  if (payload.type === "referral") {
    const { referrerId, referredId } = payload as ReferralPayload;

    if (typeof referrerId !== "string" || typeof referredId !== "string") {
      return NextResponse.json(
        { error: "referrerId and referredId are required" },
        { status: 400 }
      );
    }

    try {
      const { referrerVoucher, referredVoucher } = await createReferralVouchers(
        referrerId,
        referredId
      );

      return NextResponse.json(
        {
          referrerVoucher,
          referredVoucher,
        },
        { status: 201 }
      );
    } catch (err: unknown) {
      console.error("Referral voucher error:", err);
      const msg = err instanceof Error ? err.message : "Internal server error";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  // Invalid type
  return NextResponse.json({ error: "Invalid voucher type" }, { status: 400 });
}
