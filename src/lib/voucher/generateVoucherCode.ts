import { db } from "../db/db";
import type { Voucher } from "@prisma/client";

/**
 * Generate a random voucher code with an optional prefix.
 * @param prefix - Code prefix (e.g., "VCH" or "REF").
 * @returns A random, uppercase voucher code string.
 */
export function generateVoucherCode(prefix = "VCH"): string {
  return `${prefix}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}

/**
 * Create a manual voucher in the database.
 * @param params.value - The monetary value of the voucher (required).
 * @param params.discount - The discount amount or percentage (required).
 * @param params.createdBy - The user ID or system identifier creating this voucher (required).
 * @returns The created Voucher record.
 */
export async function createManualVoucher(params: {
  value: number;
  discount: number;
  createdBy: string;
}): Promise<Voucher> {
  const { value, discount, createdBy } = params;
  if (value == null || discount == null || !createdBy) {
    throw new Error(
      "Missing required fields: value, discount, and createdBy are all required to create a manual voucher."
    );
  }

  const code = generateVoucherCode();
  return await db.voucher.create({
    data: { code, value, discount, type: "manual", createdBy },
  });
}

/**
 * Create referral vouchers for both the referrer and referred user,
 * then send them system messages.
 * @param referrerId - The user ID who referred someone.
 * @param referredId - The user ID who was referred.
 * @returns An object containing both created Voucher records.
 */
export async function createReferralVouchers(
  referrerId: string,
  referredId: string
): Promise<{ referrerVoucher: Voucher; referredVoucher: Voucher }> {
  const amount = 20000; // IDR 20,000
  const messageContent = `You've received a voucher worth IDR ${amount.toLocaleString()} 🎉`;

  const [referrerVoucher, referredVoucher] = await db.$transaction([
    db.voucher.create({
      data: {
        code: generateVoucherCode("REF"),
        value: amount,
        discount: 0,
        type: "referral",
        createdBy: "system",
        referrals: { connect: { id: referrerId } },
      },
    }),
    db.voucher.create({
      data: {
        code: generateVoucherCode("REF"),
        value: amount,
        discount: 0,
        type: "referral",
        createdBy: "system",
        referrals: { connect: { id: referredId } },
      },
    }),
  ]);

  // send notification messages (fire-and-forget)
  await Promise.all([
    sendMessageToUser({ toUserId: referrerId, content: messageContent }),
    sendMessageToUser({ toUserId: referredId, content: messageContent }),
  ]);

  return { referrerVoucher, referredVoucher };
}

// Internal helper: send system message to a user
async function sendMessageToUser({
  toUserId,
  content,
}: {
  toUserId: string;
  content: string;
}) {
  const SYSTEM_USER_ID = "system";

  let conversation = await db.conversation.findFirst({
    where: {
      participants: {
        every: { id: { in: [SYSTEM_USER_ID, toUserId] } },
      },
    },
  });

  if (!conversation) {
    conversation = await db.conversation.create({
      data: {
        participants: { connect: [{ id: SYSTEM_USER_ID }, { id: toUserId }] },
      },
    });
  }

  return db.message.create({
    data: {
      content,
      accountId: toUserId,
      senderId: SYSTEM_USER_ID,
      conversationId: conversation.id,
    },
  });
}
