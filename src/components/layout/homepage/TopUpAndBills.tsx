// src/components/layout/homepage/TopUpAndBills.tsx

"use client";

import React from "react";

const TopUpAndBills = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Top Up & Bills</h2>

      <div className="flex flex-col sm:flex-row sm:space-x-6">
        {/* Top Up Section */}
        <div className="flex-1 mb-4 sm:mb-0">
          <h3 className="text-xl font-semibold mb-4">Top Up Your Account</h3>
          <div className="p-4 border border-gray-300 rounded-lg">
            <p className="mb-4">
              Add funds to your account for a smoother shopping experience.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Top Up Now
            </button>
          </div>
        </div>

        {/* Bills Section */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">View Bills</h3>
          <div className="p-4 border border-gray-300 rounded-lg">
            <p className="mb-4">
              View and manage your previous bills and payment history.
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
              View Bills
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopUpAndBills;
