// src/app/wallet/page.tsx
"use client";
import React, { useState } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState(100); // Mock initial wallet balance
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState(0); // Add state for top-up amount
  const [transactionHistory, setTransactionHistory] = useState<
    { type: string; amount: number; date: string }[]
  >([]);
  const [error, setError] = useState<string>("");

  // Top up function
  const handleTopUp = (amount: number) => {
    if (amount <= 0) {
      setError("Please enter a valid top-up amount.");
      return;
    }
    setBalance(balance + amount);
    setTransactionHistory([
      ...transactionHistory,
      { type: "Top Up", amount, date: new Date().toLocaleString() },
    ]);
    alert(`Wallet topped up with $${amount}`);
    setTopUpAmount(0); // Reset the top-up amount after submission
    setError(""); // Clear error after successful top-up
  };

  // Withdraw function
  const handleWithdraw = (amount: number) => {
    if (amount <= 0) {
      setError("Please enter a valid withdrawal amount.");
      return;
    }

    if (balance >= amount) {
      setBalance(balance - amount);
      setTransactionHistory([
        ...transactionHistory,
        { type: "Withdraw", amount, date: new Date().toLocaleString() },
      ]);
      alert(`Successfully withdrew $${amount}`);
      setWithdrawAmount(0); // Reset withdrawal amount after success
      setError(""); // Clear error after successful withdrawal
    } else {
      setError("Insufficient balance for withdrawal.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wallet</h1>

      {/* Wallet Balance Display */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="text-lg">Current Balance: ${balance}</div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="flex flex-row space-x-10 justify-between">
        {/* Top-Up Section */}
        <section className="mb-6 w-full">
          <h2 className="text-xl font-semibold mb-2">Top Up Wallet</h2>
          <div>
            <input
              type="number"
              className="border p-2 w-full rounded mb-4"
              placeholder="Enter amount to top up"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(Number(e.target.value))}
            />
            <button
              onClick={() => handleTopUp(topUpAmount)}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 w-full"
            >
              Top Up
            </button>
          </div>
        </section>

        {/* Withdraw Section */}
        <section className="mb-6 w-full">
          <h2 className="text-xl font-semibold mb-2">Withdraw</h2>
          <input
            type="number"
            className="border p-2 w-full rounded mb-4"
            placeholder="Enter withdrawal amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
          />
          <button
            onClick={() => handleWithdraw(withdrawAmount)}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 w-full"
          >
            Withdraw
          </button>
        </section>
      </div>

      {/* Transaction History */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {transactionHistory.length > 0 ? (
              transactionHistory.map((transaction, index) => (
                <li key={index} className="border-b py-2">
                  <strong>{transaction.type}</strong> - ${transaction.amount} on{" "}
                  {transaction.date}
                </li>
              ))
            ) : (
              <li className="py-2">No transactions yet.</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
