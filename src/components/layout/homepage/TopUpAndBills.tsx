"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/common/Tabs";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Wifi, Zap, CreditCard, Wallet, FileText, PlugZap } from "lucide-react";

const TopUpAndBills = () => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [selectedBillType, setSelectedBillType] = useState("electricity");

  const billTypes = [
    {
      id: "electricity",
      name: "PLN Electricity",
      icon: <Zap className="h-5 w-5" />,
    },
    { id: "wifi", name: "WiFi/Internet", icon: <Wifi className="h-5 w-5" /> },
    { id: "water", name: "Water Bills", icon: <PlugZap className="h-5 w-5" /> },
    {
      id: "phone",
      name: "Phone Credit",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "other",
      name: "Other Bills",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Topping up wallet with amount:", topUpAmount);
    // Add your top-up logic here
    alert(
      `Successfully topped up Rp ${Number(topUpAmount).toLocaleString(
        "id-ID"
      )} to your AiPasar Wallet`
    );
    setTopUpAmount("");
  };

  const handleBillPayment = (billType: string) => {
    console.log("Paying bill type:", billType);
    // Add your bill payment logic here
    alert(
      `Redirecting to ${
        billTypes.find((b) => b.id === billType)?.name
      } payment...`
    );
  };

  return (
    <section className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Top Up & Bills
      </h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <Tabs defaultValue="topup" className="w-full">
          <TabsList className="flex w-full rounded-t-xl bg-gray-50 border-b border-gray-100">
            <TabsTrigger
              value="topup"
              className="flex items-center gap-2 flex-1 py-3"
            >
              <Wallet className="h-4 w-4" />
              <span>Top Up</span>
            </TabsTrigger>
            <TabsTrigger
              value="bills"
              className="flex items-center gap-2 flex-1 py-3"
            >
              <FileText className="h-4 w-4" />
              <span>Pay Bills</span>
            </TabsTrigger>
          </TabsList>

          {/* Top Up Content */}
          <TabsContent value="topup" className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Top Up AiPasar Wallet
              </h3>
              <p className="text-gray-500 text-sm">
                Add funds to your wallet for a smoother shopping experience
              </p>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount (Rp)
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  required
                  className="w-full focus:border-blue-400 focus:ring-blue-300"
                  min="10000"
                  step="1000"
                />
              </div>

              <div className="grid grid-cols-4 gap-2 mt-3">
                {[50000, 100000, 200000, 500000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setTopUpAmount(amount.toString())}
                    className="py-2 px-3 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md border border-gray-200 transition-colors"
                  >
                    {amount.toLocaleString("id-ID")}
                  </button>
                ))}
              </div>

              <Button
                type="submit"
                disabled={!topUpAmount}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                Top Up Now
              </Button>
            </form>
          </TabsContent>

          {/* Bills Content */}
          <TabsContent value="bills" className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Pay Your Bills
              </h3>
              <p className="text-gray-500 text-sm">
                Select a bill type to make a payment
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {billTypes.map((bill) => (
                <button
                  key={bill.id}
                  onClick={() => handleBillPayment(bill.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                    selectedBillType === bill.id
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setSelectedBillType(bill.id)}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 mb-2 text-blue-500">
                    {bill.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {bill.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <Button
                onClick={() => handleBillPayment(selectedBillType)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                Continue to Payment
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TopUpAndBills;
