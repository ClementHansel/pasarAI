// src/types/insights.ts

export type ActiveUser = {
  date: string;
  count: number;
};

export type ChurnRate = {
  date: string;
  percentage: number;
};

export type AcquisitionCost = {
  date: string;
  cost: number;
};

export type CustomerGrowth = {
  date: string;
  growth: number;
};

export type LifetimeValue = {
  date: string;
  value: number;
};

export type RetentionRate = {
  date: string;
  percentage: number;
};

export type NewVsReturning = {
  date: string;
  new: number;
  returning: number;
};

export type TopCustomer = {
  name: string;
  totalSpend: number;
  lastPurchase: string;
};

export type InsightsData = {
  activeUsers: ActiveUser[];
  churnRate: ChurnRate[];
  acquisitionCost: AcquisitionCost[];
  customerGrowth: CustomerGrowth[];
  lifetimeValue: LifetimeValue[];
  retentionRate: RetentionRate[];
  newVsReturning: NewVsReturning[];
  topCustomers: TopCustomer[];
};
