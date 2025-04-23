"use client";
import React, { useState } from "react";

export default function PaymentPage() {
  // Simulated wallet balance and transaction history (replace this with state management)
  const [walletBalance, setWalletBalance] = useState(100); // Example initial balance of $100, convert to real API later
  const [transactionHistory, setTransactionHistory] = useState([
    { type: "Top Up", amount: 100, date: "2025-04-23 12:00" }, // Example initial transaction, convert to real API later
  ]);
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");

  // Simulate a payment process
  const handlePayment = () => {
    const purchaseAmount = 50; // Example purchase amount

    // Check if user has enough funds
    if (walletBalance >= purchaseAmount) {
      // Deduct from wallet balance
      setWalletBalance(walletBalance - purchaseAmount);

      // Record the "Purchase" transaction
      const newTransaction = {
        type: "Purchase",
        amount: purchaseAmount,
        date: new Date().toLocaleString(),
      };

      setTransactionHistory([...transactionHistory, newTransaction]);

      // Clear form and show success (for simulation purposes)
      setCardholderName("");
      setCardNumber("");
      setExpiryDate("");
      setCvc("");
      setError(""); // Reset error
      alert("Payment successful!"); // Simulate success
    } else {
      // Insufficient funds
      setError("Insufficient funds, please top up your wallet.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>

      {/* Billing Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Billing Information</h2>
        <div className="bg-white p-4 rounded shadow space-y-4">
          <label className="block">
            <span className="block mb-1 font-medium">Cardholder Name</span>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="block mb-1 font-medium">Card Number</span>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="•••• •••• •••• ••••"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </label>

          <div className="flex space-x-4">
            <label className="flex-1">
              <span className="block mb-1 font-medium">Expiry Date</span>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </label>

            <label className="flex-1">
              <span className="block mb-1 font-medium">CVC</span>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </label>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 mb-4">
          <strong>{error}</strong>
        </div>
      )}

      {/* Payment Button */}
      <button
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 w-full"
        onClick={handlePayment}
      >
        Pay Now
      </button>

      {/* Wallet Balance */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
        <div className="bg-white p-4 rounded shadow">
          <p>Your current balance: ${walletBalance}</p>
        </div>
      </section>

      {/* Transaction History */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
        <div className="bg-white p-4 rounded shadow">
          <ul className="space-y-2">
            {transactionHistory.map((transaction, index) => (
              <li key={index} className="flex justify-between">
                <span>{transaction.type}</span>
                <span>{transaction.amount}</span>
                <span>{transaction.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
