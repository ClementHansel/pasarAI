import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { verifyMagicLinkToken } from "@/lib/auth/authUtils";
import { sendEmail } from "@/lib/mailer.server";
import { generateVoucherCode } from "@/lib/voucher/generateVoucherCode";

const VOUCHER_AMOUNT = 20000; // IDR

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    let payload: { email: string };
    try {
      payload = verifyMagicLinkToken(token);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const account = await db.account.findUnique({
      where: { email: payload.email },
    });
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }
    if (account.isVerified) {
      return NextResponse.json(
        { message: "Account already verified" },
        { status: 200 }
      );
    }

    const { userVoucher, referrerVoucher } = await db.$transaction(
      async (tx) => {
        await tx.account.update({
          where: { id: account.id },
          data: { isVerified: true, emailVerifiedAt: new Date() },
        });

        const userVoucher = await tx.voucher.create({
          data: {
            code: generateVoucherCode("VCH"),
            value: VOUCHER_AMOUNT,
            discount: 0,
            type: "referral",
            createdBy: account.id,
          },
        });

        let referrerVoucher = null;
        if (account.referredById) {
          referrerVoucher = await tx.voucher.create({
            data: {
              code: generateVoucherCode("VCH"),
              value: VOUCHER_AMOUNT,
              discount: 0,
              type: "referral",
              createdBy: account.referredById,
            },
          });
        }

        return { userVoucher, referrerVoucher };
      }
    );

    // Email to **new user**
    const userHtml = `
      <p>Hi <strong>${account.name}</strong>,</p>
      <p>Thanks for verifying your account!</p>
      <ul>
        <li>Your referral code: <code>${account.referralCode}</code></li>
        <li>Your voucher code: <code>${userVoucher.code}</code></li>
      </ul>
    `;
    await sendEmail(
      "Welcome! Your account is verified",
      account.email ?? "",
      `Referral: ${account.referralCode}, Voucher: ${userVoucher.code}`,
      userHtml
    );

    // Email to **referrer** (if any)
    if (referrerVoucher && account.referredById) {
      const referrer = await db.account.findUnique({
        where: { id: account.referredById },
      });
      if (referrer?.email) {
        const html = `
          <p>Hi <strong>${referrer.name}</strong>,</p>
          <p>Your friend <strong>${account.name}</strong> has just verified their account.</p>
          <p>Your voucher code: <code>${referrerVoucher.code}</code></p>
        `;
        await sendEmail(
          "Your referral reward has arrived!",
          referrer.email,
          `Voucher: ${referrerVoucher.code}`,
          html
        );
      }
    }

    return NextResponse.json(
      { message: "Account verified and vouchers issued" },
      { status: 200 }
    );
  } catch (error) {
    console.error("VERIFY-ACCOUNT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
