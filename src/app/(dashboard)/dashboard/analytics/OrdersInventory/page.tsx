import { RouteGuard } from "@/components/auth/RouteGuard";
import DelayedShipments from "@/components/dashboard/analyticals/ShippingDelivery/DelayedShipments";
import DeliveryTimes from "@/components/dashboard/analyticals/ShippingDelivery/DeliveryTimes";
import OrderTracking from "@/components/dashboard/analyticals/ShippingDelivery/OrderTracking";
import PackageDamageRate from "@/components/dashboard/analyticals/ShippingDelivery/PackageDamageRate";
import ShippingCostPerItem from "@/components/dashboard/analyticals/ShippingDelivery/ShippingCostPerItem";
import ShippingCosts from "@/components/dashboard/analyticals/ShippingDelivery/ShippingCosts";
import ShippingMethodComparison from "@/components/dashboard/analyticals/ShippingDelivery/ShippingMethodComparison";
import ShippingPerformance from "@/components/dashboard/analyticals/ShippingDelivery/ShippingPerformance";
import ShippingProviderPerformance from "@/components/dashboard/analyticals/ShippingDelivery/ShippingProviderPerformance";

const ShippingDeliveryPage: React.FC = () => {
  // Sample data for PackageDamageRate component
  const damageRate = 1.2; // Example damage rate
  const trend: "up" | "down" = "down"; // Example trend
  const comparison = "compared to last month"; // Example comparison

  return (
    <RouteGuard allowedRoles={["SELLER"]}>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">🚚 Shipping & Delivery</h1>

        {/* Grid Layout for components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <DelayedShipments />
          <DeliveryTimes />
          <OrderTracking />
          {/* Pass props to PackageDamageRate component */}
          <PackageDamageRate
            damageRate={damageRate}
            trend={trend}
            comparison={comparison}
          />
          <ShippingCostPerItem />
          <ShippingCosts />
          <ShippingMethodComparison />
          <ShippingPerformance />
          <ShippingProviderPerformance />
        </div>
      </div>
    </RouteGuard>
  );
};

export default ShippingDeliveryPage;
