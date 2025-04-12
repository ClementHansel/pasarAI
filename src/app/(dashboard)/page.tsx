// src/app/(dashboard)/page.tsx
import Stats from "@/components/dashboard/Stats";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="p-4">
      {/* Dashboard Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-lg text-gray-600">Your performance overview</p>
      </header>

      {/* Stats Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-medium mb-4">Statistics</h2>
        <Stats /> {/* Stats component will display key metrics */}
      </section>

      {/* Additional sections or widgets can be added here */}
      <section>
        {/* Add additional widgets here like recent orders, user activity, etc. */}
      </section>
    </div>
  );
};

export default DashboardPage;
