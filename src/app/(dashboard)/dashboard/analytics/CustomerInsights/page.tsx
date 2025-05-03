import ActiveUsers from "@/components/dashboard/analyticals/CustomerInsights/ActiveUsers";
import ChurnRate from "@/components/dashboard/analyticals/CustomerInsights/ChurnRate";
import CustomerAcquisitionCost from "@/components/dashboard/analyticals/CustomerInsights/CustomerAcquisitionCost";
import CustomerGrowth from "@/components/dashboard/analyticals/CustomerInsights/CustomerGrowth";
import CustomerLifetimeValue from "@/components/dashboard/analyticals/CustomerInsights/CustomerLifetimeValue";
import CustomerRetention from "@/components/dashboard/analyticals/CustomerInsights/CustomerRetention";
import NewVsReturning from "@/components/dashboard/analyticals/CustomerInsights/NewVsReturning";
import TopCustomers from "@/components/dashboard/analyticals/CustomerInsights/TopCustomers";
import { useState } from "react";

export default function CustomerInsightsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/cron/customer-insights");
      const text = await res.text();
      setMessage(text);
    } catch (error) {
      console.error(error);
      setMessage("Failed to generate customer insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold flex justify-between">
          👥 Customer Insights
        </h1>

        <div className="space-y-2">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Customer Insights"}
          </button>
          {message && <p className="text-sm text-gray-700">{message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ActiveUsers />
        <ChurnRate />
        <CustomerAcquisitionCost />
        <CustomerGrowth />
        <CustomerLifetimeValue />
        <CustomerRetention />
        <NewVsReturning />
        <TopCustomers />
      </div>
    </div>
  );
}
