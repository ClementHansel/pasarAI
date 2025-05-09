"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

import mockInsights from "@/data/insightsMock";
import {
  AcquisitionCost,
  ActiveUser,
  ChurnRate,
  CustomerGrowth,
  LifetimeValue,
  NewVsReturning,
  RetentionRate,
  TopCustomer,
} from "@/types/analytical/customerInsights";

const CustomerInsightsPage = ({
  accountId,
  role,
}: {
  accountId: string;
  role: string;
}) => {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>();
  const [churnRate, setChurnRate] = useState<ChurnRate[]>();
  const [acquisitionCost, setAcquisitionCost] = useState<AcquisitionCost[]>();
  const [customerGrowth, setCustomerGrowth] = useState<CustomerGrowth[]>();
  const [lifetimeValue, setLifetimeValue] = useState<LifetimeValue[]>();
  const [retentionRate, setRetentionRate] = useState<RetentionRate[]>();
  const [newVsReturning, setNewVsReturning] = useState<NewVsReturning[]>();
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>();

  useEffect(() => {
    setActiveUsers(mockInsights.activeUsers);
    setChurnRate(mockInsights.churnRate);
    setAcquisitionCost(mockInsights.acquisitionCost);
    setCustomerGrowth(mockInsights.customerGrowth);
    setLifetimeValue(mockInsights.lifetimeValue);
    setRetentionRate(mockInsights.retentionRate);
    setNewVsReturning(mockInsights.newVsReturning);
    setTopCustomers(mockInsights.topCustomers);
  }, [accountId, role]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Customer Insights</h1>
      <div>
        {/* Top Customers */}
        {topCustomers && (
          <div>
            <h2 className="text-xl font-semibold">Top Customers</h2>
            <ul className="space-y-2">
              {topCustomers.map((customer, idx) => (
                <li key={idx} className="border p-3 rounded shadow-sm">
                  <p className="font-medium">{customer.name}</p>
                  <p>Total Spend: ${customer.totalSpend}</p>
                  <p>Last Purchase: {customer.lastPurchase}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Users */}
        {activeUsers && (
          <div>
            <h2 className="text-xl font-semibold">Active Users</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activeUsers}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Churn Rate */}
        {churnRate && (
          <div>
            <h2 className="text-xl font-semibold">Churn Rate (%)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={churnRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="percentage" stroke="#e74c3c" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Acquisition Cost */}
        {acquisitionCost && (
          <div>
            <h2 className="text-xl font-semibold">Acquisition Cost</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={acquisitionCost}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Customer Growth */}
        {customerGrowth && (
          <div>
            <h2 className="text-xl font-semibold">Customer Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="growth" stroke="#2ecc71" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Lifetime Value */}
        {lifetimeValue && (
          <div>
            <h2 className="text-xl font-semibold">Lifetime Value</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lifetimeValue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9b59b6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Retention Rate */}
        {retentionRate && (
          <div>
            <h2 className="text-xl font-semibold">Retention Rate (%)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={retentionRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="percentage" stroke="#f39c12" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* New vs Returning Customers */}
        {newVsReturning && (
          <div>
            <h2 className="text-xl font-semibold">New vs Returning</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={newVsReturning}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" fill="#1abc9c" />
                <Bar dataKey="returning" fill="#e67e22" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInsightsPage;
