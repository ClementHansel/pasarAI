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

async function sendMessageToUser({
  toUserId,
  content,
}: {
  toUserId: string;
  content: string;
}) {
  const SYSTEM_USER_ID = "system"; // Replace with your actual system account ID

  // Find or create a conversation between system and user
  let conversation = await db.conversation.findFirst({
    where: {
      participants: {
        every: {
          id: { in: [SYSTEM_USER_ID, toUserId] },
        },
      },
    },
  });

  if (!conversation) {
    conversation = await db.conversation.create({
      data: {
        participants: {
          connect: [{ id: SYSTEM_USER_ID }, { id: toUserId }],
        },
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

export async function createReferralVouchers(
  referrerId: string,
  referredId: string
) {
  const amount = 20000; // IDR 20,000
  const messageContent = `You've received a voucher worth IDR 20,000 🎉`;

  const [referrerVoucher, referredVoucher] = await db.$transaction([
    db.voucher.create({
      data: {
        code: generateVoucherCode("REF"),
        value: amount,
        type: "referral",
        createdBy: "system",
        referrals: {
          connect: { id: referrerId },
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

  // Send messages to both referrer and referred
  await Promise.all([
    sendMessageToUser({ toUserId: referrerId, content: messageContent }),
    sendMessageToUser({ toUserId: referredId, content: messageContent }),
  ]);

  return { referrerVoucher, referredVoucher };
}
