export type ManualPayload = {
  type: "manual";
  value?: number;
  discount?: number;
  createdBy: string;
};

export type ReferralPayload = {
  type: "referral";
  referrerId: string;
  referredId: string;
};

export type VoucherPayload = ManualPayload | ReferralPayload;
