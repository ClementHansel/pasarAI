import { db } from "../db/db";

// utils/generateVoucherCode.ts
export function generateVoucherCode(prefix = "VCH"): string {
  return `${prefix}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}

export async function createManualVoucher({
  value,
  discount,
  createdBy,
}: {
  value?: number;
  discount?: number;
  createdBy: string;
}) {
  const code = generateVoucherCode();
  return db.voucher.create({
    data: {
      code,
      value,
      discount,
      type: "manual",
      createdBy,
    },
  });
}

export async function createReferralVouchers(
  referrerId: string,
  referredId: string
) {
  const amount = 20000; // IDR 20,000

  const [referrerVoucher, referredVoucher] = await db.$transaction([
    db.voucher.create({
      data: {
        code: generateVoucherCode("REF"),
        value: amount,
        type: "referral",
        createdBy: "system",
        referrals: {
          connect: { id: referrerId }, // assuming Referral model has user IDs or reference
        },
      },
    }),
    db.voucher.create({
      data: {
        code: generateVoucherCode("REF"),
        value: amount,
        type: "referral",
        createdBy: "system",
        referrals: {
          connect: { id: referredId },
        },
      },
    }),
  ]);

  return { referrerVoucher, referredVoucher };
}
