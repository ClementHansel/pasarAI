// src/types/insights.ts

export interface ActiveUsersInsight {
  date: string;
  activeUsers: number;
}

export interface ChurnRateInsight {
  date: string;
  churnRate: number;
}

export interface AcquisitionCostInsight {
  date: string;
  acquisitionCost: number;
}

export interface CustomerGrowthInsight {
  date: string;
  newCustomers: number;
}

export interface LifetimeValueInsight {
  date: string;
  lifetimeValue: number;
}

export interface RetentionRateInsight {
  date: string;
  retentionRate: number;
}

export interface NewVsReturningInsight {
  date: string;
  newCustomerCount: number;
  returningCustomerCount: number;
}

export interface TopCustomer {
  name: string;
  value: number;
}

export type InsightsData = {
  activeUsers?: ActiveUsersInsight[];
  churnRate?: ChurnRateInsight[];
  acquisitionCost?: AcquisitionCostInsight[];
  customerGrowth?: CustomerGrowthInsight[];
  lifetimeValue?: LifetimeValueInsight[];
  retentionRate?: RetentionRateInsight[];
  newVsReturning?: NewVsReturningInsight[];
  topCustomers?: TopCustomer[];
};
