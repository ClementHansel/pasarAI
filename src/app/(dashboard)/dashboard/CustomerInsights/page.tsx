import ActiveUsers from "@/components/dashboard/CustomerInsights/ActiveUsers";
import ChurnRate from "@/components/dashboard/CustomerInsights/ChurnRate";
import CustomerAcquisitionCost from "@/components/dashboard/CustomerInsights/CustomerAcquisitionCost";
import CustomerGrowth from "@/components/dashboard/CustomerInsights/CustomerGrowth";
import CustomerLifetimeValue from "@/components/dashboard/CustomerInsights/CustomerLifetimeValue";
import CustomerRetention from "@/components/dashboard/CustomerInsights/CustomerRetention";
import NewVsReturning from "@/components/dashboard/CustomerInsights/NewVsReturning";
import TopCustomers from "@/components/dashboard/CustomerInsights/TopCustomers";

export default function CustomerInsightsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">👥 Customer Insights</h1>

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
