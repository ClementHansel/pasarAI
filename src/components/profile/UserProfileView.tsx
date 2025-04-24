import React, { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { UserProfile } from "@/lib/data/profile";
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils";
import {
  User,
  ShoppingBag,
  Heart,
  Wallet,
  Settings,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface UserProfileViewProps {
  profile: UserProfile;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  profile,
}) => {
  const [activeTab, setActiveTab] = useState("orders");
  const [transactionType, setTransactionType] = useState<
    "all" | "topup" | "withdraw"
  >("all");
  const [orderFilter, setOrderFilter] = useState<
    "all" | "pending" | "completed" | "cancelled"
  >("all");

  // Handle edit profile click
  const handleEditProfile = () => {
    setActiveTab("settings");
  };

  // Filter transactions based on type
  const filteredTransactions = profile.wallet.transactions.filter(
    (transaction) => {
      if (transactionType === "all") return true;
      if (transactionType === "topup") return transaction.type === "credit";
      return transaction.type === "debit";
    }
  );

  // Filter orders based on status
  const filteredOrders = profile.orderHistory.filter((order) => {
    if (orderFilter === "all") return true;
    return order.status === orderFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50">
            <Image
              src={profile.avatar || "/images/picture-not-found.png"}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1">
              <User size={14} />
              Member since {formatDate(profile.joinDate)}
            </p>
          </div>
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-white rounded-lg p-1 shadow-md w-full justify-start overflow-x-auto border">
          {[
            {
              value: "orders",
              icon: <ShoppingBag size={16} />,
              label: "Orders",
            },
            { value: "wishlist", icon: <Heart size={16} />, label: "Wishlist" },
            { value: "wallet", icon: <Wallet size={16} />, label: "Wallet" },
            {
              value: "settings",
              icon: <Settings size={16} />,
              label: "Settings",
            },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Orders Tab */}
        <TabsContent
          value="orders"
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="text-blue-600" size={20} />
              Order History
            </h2>
            <div className="flex gap-2">
              {["all", "pending", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status as typeof orderFilter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    orderFilter === status
                      ? "bg-blue-600 text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredOrders
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      Order #{order.id}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        getStatusColor(order.status).bg
                      } ${getStatusColor(order.status).text}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Date: {formatDate(order.date)}
                  </p>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"
                      >
                        {item.image && (
                          <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-blue-600 text-sm">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                    <p className="font-semibold">
                      Total: {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent
          value="wallet"
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg mb-6 text-white">
            <p className="text-sm opacity-90">Current Balance</p>
            <p className="text-4xl font-bold">
              {formatCurrency(profile.wallet.balance)}
            </p>
            <div className="mt-4 flex gap-3">
              <button className="bg-white text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
                Top Up
              </button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors font-medium text-sm">
                Withdraw
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {["all", "topup", "withdraw"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setTransactionType(type as "all" | "topup" | "withdraw")
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  transactionType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {filteredTransactions.map((transaction, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b pb-3 last:border-b-0 hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <div className="flex items-center gap-3">
                  {transaction.type === "credit" ? (
                    <ArrowUp className="text-green-500" size={20} />
                  ) : (
                    <ArrowDown className="text-red-500" size={20} />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-medium ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent
          value="settings"
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Profile Settings
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={profile.name}
                  className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={profile.email}
                  className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={profile.phone}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                defaultValue={profile.address}
                rows={3}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={profile.avatar || "/images/picture-not-found.png"}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Change Image
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};
