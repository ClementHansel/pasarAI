// src/app/wallet/page.tsx
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
import { WalletCards, FileText, ArrowUpDown, History } from "lucide-react";
import TransactionHistory from "@/components/wallet/TransactionHistory";

const WalletPage = () => {
  const [balance, setBalance] = useState(1500000);
  const [activeTab, setActiveTab] = useState("topup");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([
    { type: "initial", amount: 1500000, date: "2024-03-01T09:00:00" },
  ]);

  const handleTransaction = (type: string) => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      setError("Please enter a valid amount");
      return;
    }

    if (type === "withdraw" && numericAmount > balance) {
      setError("Insufficient balance");
      return;
    }

    const newBalance =
      type === "topup" ? balance + numericAmount : balance - numericAmount;

    setBalance(newBalance);
    setTransactions([
      ...transactions,
      {
        type,
        amount: numericAmount,
        date: new Date().toISOString(),
      },
    ]);

    setAmount("");
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AiPasar Wallet
        </h1>
        <div className="text-4xl font-semibold text-blue-600">
          Rp{balance.toLocaleString("id-ID")}
        </div>
        <p className="text-gray-500 mt-2">Current Balance</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 rounded-t-2xl bg-gray-50 border-b">
            <TabsTrigger value="topup" className="py-5 gap-2">
              <WalletCards className="h-5 w-5" />
              Top Up
            </TabsTrigger>
            <TabsTrigger value="bills" className="py-5 gap-2">
              <FileText className="h-5 w-5" />
              Pay Bills
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="py-5 gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Withdraw
            </TabsTrigger>
          </TabsList>

          {/* Top Up Tab */}
          <TabsContent value="topup" className="p-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Top Up Wallet</h3>
                <p className="text-gray-500 text-sm">
                  Instant top up with any payment method
                </p>
              </div>

              <Input
                type="number"
                placeholder="Enter amount (Rp)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10000"
                step="10000"
              />

              <div className="grid grid-cols-4 gap-2">
                {[50000, 100000, 200000, 500000].map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    onClick={() => setAmount(amt.toString())}
                  >
                    {amt.toLocaleString("id-ID")}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => handleTransaction("topup")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Top Up Now
              </Button>
            </div>
          </TabsContent>

          {/* Bills Tab */}
          <TabsContent value="bills" className="p-6">
            <BillsPayment />
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw" className="p-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Withdraw Funds</h3>
                <p className="text-gray-500 text-sm">
                  Transfer to your bank account
                </p>
              </div>

              <Input
                type="number"
                placeholder="Enter amount (Rp)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10000"
                step="10000"
              />

              <div className="space-y-4">
                <Input placeholder="Bank Name" />
                <Input placeholder="Account Number" />
              </div>

              <Button
                onClick={() => handleTransaction("withdraw")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Withdraw Now
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Transaction History */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <History className="h-5 w-5" />
          Transaction History
        </h3>
        <TransactionHistory transactions={transactions} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

// Bills Payment Component
const BillsPayment = () => {
  const [selectedBill, setSelectedBill] = useState("electricity");

  const billTypes = [
    { id: "electricity", name: "Electricity", icon: "⚡" },
    { id: "internet", name: "Internet", icon: "🌐" },
    { id: "water", name: "Water", icon: "💧" },
    { id: "phone", name: "Phone", icon: "📱" },
  ];

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Pay Your Bills</h3>
        <p className="text-gray-500 text-sm">Select bill type and provider</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {billTypes.map((bill) => (
          <Button
            key={bill.id}
            variant={selectedBill === bill.id ? "default" : "outline"}
            onClick={() => setSelectedBill(bill.id)}
            className="h-24 flex flex-col gap-2"
          >
            <span className="text-2xl">{bill.icon}</span>
            {bill.name}
          </Button>
        ))}
      </div>

      <Input placeholder="Customer ID / Account Number" />
      <Input placeholder="Amount (Rp)" type="number" />

      <Button className="w-full bg-blue-600 hover:bg-blue-700">
        Pay Bill Now
      </Button>
    </div>
  );
};

export default WalletPage;
