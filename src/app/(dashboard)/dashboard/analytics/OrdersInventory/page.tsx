import BackorderedItems from "@/components/dashboard/analyticals/OrdersInventory/BackorderedItems";
import InventoryTurnover from "@/components/dashboard/analyticals/OrdersInventory/InventoryTurnover";
import InventoryValue from "@/components/dashboard/analyticals/OrdersInventory/InventoryValue";
import LowStockAlerts from "@/components/dashboard/analyticals/OrdersInventory/LowStockAlerts";
import OrderFulfillmentTime from "@/components/dashboard/analyticals/OrdersInventory/OrderFulfillmentTime";
import OrderStatus from "@/components/dashboard/analyticals/OrdersInventory/OrderStatus";
import ReorderLevel from "@/components/dashboard/analyticals/OrdersInventory/ReorderLevel";
import StockAvailability from "@/components/dashboard/analyticals/OrdersInventory/StockAvailability";
import StockMovement from "@/components/dashboard/analyticals/OrdersInventory/StockMovement";
import TopSellingProducts from "@/components/dashboard/analyticals/OrdersInventory/TopSellingProducts";
import TotalOrders from "@/components/dashboard/analyticals/OrdersInventory/TotalOrders";

export default function OrdersInventoryPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">📦 Orders & Inventory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        <BackorderedItems />
        <InventoryTurnover />
        <InventoryValue />
        <LowStockAlerts />
        <OrderFulfillmentTime />
        <OrderStatus />
        <ReorderLevel />
        <StockAvailability />
        <StockMovement />
        <TopSellingProducts />
        <TotalOrders />
      </div>
    </div>
  );
}
