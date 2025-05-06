import { RouteGuard } from "@/components/auth/RouteGuard";
import ActiveUsers from "@/components/dashboard/analyticals/CustomerInsights/ActiveUsers";
import ChurnRate from "@/components/dashboard/analyticals/CustomerInsights/ChurnRate";
import CustomerAcquisitionCost from "@/components/dashboard/analyticals/CustomerInsights/CustomerAcquisitionCost";
import CustomerGrowth from "@/components/dashboard/analyticals/CustomerInsights/CustomerGrowth";
import CustomerLifetimeValue from "@/components/dashboard/analyticals/CustomerInsights/CustomerLifetimeValue";
import CustomerRetention from "@/components/dashboard/analyticals/CustomerInsights/CustomerRetention";
import NewVsReturning from "@/components/dashboard/analyticals/CustomerInsights/NewVsReturning";
import TopCustomers from "@/components/dashboard/analyticals/CustomerInsights/TopCustomers";

export default function CustomerInsightsPage() {
  return (
    <RouteGuard allowedRoles={["SELLER"]}>
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
    </RouteGuard>
  );
}
