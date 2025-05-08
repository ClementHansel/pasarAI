// src/components/layout/homepage/FinanceCenter.tsx
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
import {
  Wifi,
  Zap,
  CreditCard,
  Wallet,
  FileText,
  PlugZap,
  Gift,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function FinanceCenter() {
  const [tab, setTab] = useState<"topup" | "bills" | "redeem">("topup");

  // Top Up state
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState<"top-up" | "withdraw">("top-up");

  // Bills state
  const billTypes = [
    { id: "electricity", name: "PLN Electricity", icon: <Zap /> },
    { id: "wifi", name: "WiFi", icon: <Wifi /> },
    { id: "water", name: "Water Bills", icon: <PlugZap /> },
    { id: "phone", name: "Phone Credit", icon: <CreditCard /> },
    { id: "other", name: "Other Bills", icon: <FileText /> },
  ];
  const [selectedBill, setSelectedBill] = useState<string>(billTypes[0].id);

  // Redeem state
  const [code, setCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState<string | null>(null);
  const [redeemErr, setRedeemErr] = useState<string | null>(null);

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Successfully ${action} Rp ${Number(amount).toLocaleString("id-ID")}`
    );
    setAmount("");
  };

  const handlePayBill = () =>
    alert(
      `Redirecting to ${billTypes.find((b) => b.id === selectedBill)!.name}`
    );

  const handleRedeem = async () => {
    setRedeemLoading(true);
    setRedeemMsg(null);
    setRedeemErr(null);

    try {
      const res = await fetch("/api/voucher/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json()) as {
        voucher: { discount?: number; value?: number };
        error?: string;
      };
      if (res.ok) {
        setRedeemMsg(
          `You got $${data.voucher.discount ?? data.voucher.value} off!`
        );
        setCode("");
      } else {
        throw new Error(data.error ?? "Redeem failed");
      }
    } catch (err) {
      if (err instanceof Error) setRedeemErr(err.message);
      else setRedeemErr("An unknown error occurred");
    } finally {
      setRedeemLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-[480px] flex flex-col">
        <Tabs
          value={tab}
          onValueChange={(val: string) =>
            setTab(val as "topup" | "bills" | "redeem")
          }
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 text-center bg-gray-50 border-b">
            <TabsTrigger value="topup" className="py-4">
              <Wallet className="mx-auto mb-1 w-5 h-5 text-blue-600" />
              Top Up
            </TabsTrigger>
            <TabsTrigger value="bills" className="py-4">
              <FileText className="mx-auto mb-1 w-5 h-5 text-blue-600" />
              Pay Bills
            </TabsTrigger>
            <TabsTrigger value="redeem" className="py-4">
              <Gift className="mx-auto mb-1 w-5 h-5 text-blue-600" />
              Redeem
            </TabsTrigger>
          </TabsList>

          {/* Top Up */}
          <TabsContent value="topup" className="flex-1 p-6 overflow-y-auto">
            <form
              onSubmit={handleTopUp}
              className="space-y-6 h-full flex flex-col"
            >
              <div className="flex gap-4 flex-grow">
                <select
                  value={action}
                  onChange={(e) =>
                    setAction(e.target.value as "top-up" | "withdraw")
                  }
                  aria-label="Toggle for top up or withdraw"
                  className="flex-1 border-gray-200 rounded-lg"
                >
                  <option value="top-up">Top-Up</option>
                  <option value="withdraw">Withdraw</option>
                </select>
                <Input
                  type="number"
                  placeholder="Amount (Rp)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="10000"
                  className="flex-1"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 flex-grow">
                {[50000, 100000, 200000, 500000].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAmount(a.toString())}
                    className="py-2 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    {a.toLocaleString("id-ID")}
                  </button>
                ))}
              </div>
              <Button className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600">
                {action === "withdraw" ? "Withdraw Now" : "Top Up Now"}
              </Button>
            </form>
          </TabsContent>

          {/* Pay Bills */}
          <TabsContent value="bills" className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6 h-full flex flex-col">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-grow">
                {billTypes.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBill(b.id)}
                    className={`p-4 rounded-lg border ${
                      selectedBill === b.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="mx-auto mb-2 text-blue-600">{b.icon}</div>
                    <p className="text-sm text-center">{b.name}</p>
                  </button>
                ))}
              </div>
              <Button
                onClick={handlePayBill}
                className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"
              >
                Continue to Payment
              </Button>
            </div>
          </TabsContent>

          {/* Redeem */}
          <TabsContent value="redeem" className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4 h-full flex flex-col">
              <div className="relative flex-grow">
                <Input
                  placeholder="Gift card code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={redeemLoading}
                  className="pl-10"
                />
                <Gift className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Button
                onClick={handleRedeem}
                disabled={redeemLoading || !code.trim()}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600"
              >
                {redeemLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                Redeem Voucher
              </Button>
              <div className="flex-grow" />
              {redeemMsg && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
                  <CheckCircle /> <span>{redeemMsg}</span>
                </div>
              )}
              {redeemErr && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-lg">
                  <AlertCircle /> <span>{redeemErr}</span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
