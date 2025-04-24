// src/components/profile/UserProfileView.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { UserProfile } from "@/lib/data/profile";
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils";
import { User, ShoppingBag, Heart, Wallet, Settings } from "lucide-react";

interface UserProfileViewProps {
  profile: UserProfile;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  profile,
}) => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 transition-all hover:shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 shadow-md">
            <Image
              src={
                profile.avatar &&
                profile.avatar.startsWith("http") &&
                profile.avatar.includes("api.dicebear.com")
                  ? profile.avatar
                  : "/images/picture-not-found.png"
              }
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
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow flex items-center gap-2">
            <Settings size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <Tabs
        defaultValue="orders"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-white rounded-lg p-1 shadow-md w-full justify-start overflow-x-auto">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag size={16} />
            Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart size={16} />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet size={16} />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="orders"
          className="bg-white rounded-xl shadow-md p-6 transition-all"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-blue-600" />
            Order History
          </h2>
          <div className="space-y-4">
            {profile.orderHistory.map((order) => {
              const statusColor = getStatusColor(order.status);
              return (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      Order #{order.id}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColor.bg} ${statusColor.text}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Date: {formatDate(order.date)}
                  </p>

                  {/* Order Items */}
                  <div className="mt-3 space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                      >
                        {item.image && (
                          <div className="w-12 h-12 relative rounded-md overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-blue-600">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t flex justify-between items-center">
                    <button className="text-blue-600 text-sm hover:underline">
                      View Details
                    </button>
                    <p className="font-semibold">
                      Total: {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent
          value="wishlist"
          className="bg-white rounded-xl shadow-md p-6 transition-all"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <Heart className="text-red-500" />
            Wishlist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.wishlist.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-semibold mt-1">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                    <button className="w-10 aspect-square flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="wallet"
          className="bg-white rounded-xl shadow-md p-6 transition-all"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <Wallet className="text-green-600" />
            Wallet
          </h2>
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg mb-6 text-white shadow-md">
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

          <h3 className="font-medium text-gray-700 mb-3">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {profile.wallet.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
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

        <TabsContent
          value="settings"
          className="bg-white rounded-xl shadow-md p-6 transition-all"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <Settings className="text-gray-600" />
            Profile Settings
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={profile.name}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={profile.email}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
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
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                defaultValue={profile.address}
                rows={3}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={profile.avatar || "/api/placeholder/64/64"}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
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
