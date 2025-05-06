"use client";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/common/Tabs";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { WalletCards, FileText, ArrowUpDown, History } from "lucide-react";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { TransactionFilter } from "@/components/wallet/TransactionFilter";
import { Transaction } from "@/types/wallet";
import { v4 as uuidv4 } from "uuid";
import { RouteGuard } from "@/components/auth/RouteGuard";

const WalletPageContent = () => {
  const [balance, setBalance] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("topup");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Mock user role - replace with actual auth implementation
  const userRole: "user" | "seller" = "seller";

  const accountId = "demo-account"; // This should be dynamically fetched via user authentication

  // Fetch wallet and transactions on component mount
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch(`/api/wallet?accountId=${accountId}`);
        const data = await response.json();
        if (response.ok) {
          setBalance(data.balance);
          setTransactions(data.transactions);
        } else {
          setError(data.error || "Failed to fetch wallet data");
        }
      } catch {
        setError("Error fetching wallet data");
      }
    };

    fetchWalletData();
  }, []);

  const handleTransaction = async (type: Transaction["type"]) => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      setError("Please enter a valid amount");
      return;
    }

    if (type === "withdraw" && numericAmount > balance) {
      setError("Insufficient balance");
      return;
    }

    try {
      const response = await fetch("/api/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId,
          amount: numericAmount,
          type,
          method: "BANK_TRANSFER", // Placeholder for actual payment method
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance);
        setTransactions([
          ...transactions,
          {
            id: uuidv4(),
            accountId: accountId,
            amount: numericAmount,
            type,
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
        setAmount("");
        setError("");
      } else {
        setError(data.error || "Transaction failed");
      }
    } catch {
      setError("Error processing transaction");
    }
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

      {/* Transaction History Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <History className="h-5 w-5" />
            Transaction History
          </h3>
          <div>
            <TransactionFilter onFilterChange={setFilter} userRole={userRole} />
          </div>
        </div>

        <TransactionHistory
          transactions={transactions}
          filter={filter}
          userRole={userRole}
        />
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

      <div className="space-y-4">
        {billTypes.map((bill) => (
          <Button
            key={bill.id}
            variant={selectedBill === bill.id ? "solid" : "outline"}
            className="w-full"
            onClick={() => setSelectedBill(bill.id)}
          >
            {bill.icon} {bill.name}
          </Button>
        ))}
      </div>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={() => alert("Bill Payment Success")}
      >
        Pay Bill Now
      </Button>
    </div>
  );
};

export default function WalletPage() {
  return (
    <RouteGuard allowedRoles={["BUYER", "SELLER", "ADMIN"]}>
      <WalletPageContent />
    </RouteGuard>
  );
}
