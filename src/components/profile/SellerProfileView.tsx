// src/components/profile/SellerProfileView.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { SellerProfile } from "@/lib/data/profile";
import { formatCurrency } from "@/lib/utils";
import {
  Store,
  ShoppingBag,
  BarChart,
  Settings,
  Plus,
  Pencil,
  Trash,
  Star,
  Package,
  TrendingUp,
} from "lucide-react";

interface SellerProfileViewProps {
  profile: SellerProfile;
}

export const SellerProfileView: React.FC<SellerProfileViewProps> = ({
  profile,
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // For a real implementation, you would use the actual Chart.js component
  // This is just a visual mockup of charts
  const renderChart = (data: number[], color: string) => {
    const max = Math.max(...data);

    return (
      <div className="flex items-end h-40 gap-2 mt-4">
        {data.map((value, index) => {
          const height = (value / max) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-full rounded-t-md ${color}`}
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs mt-2 text-gray-500">
                {months[index]}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Store Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 transition-all hover:shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-50 shadow-md">
            {profile.avatar &&
            profile.avatar.startsWith("http") &&
            profile.avatar.includes("api.dicebear.com") ? (
              <Image
                src={profile.avatar}
                alt={profile.businessInfo.storeName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <Image
                  src="/images/picture-not-found.png"
                  alt="Picture Not Found"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {profile.businessInfo.storeName}
            </h1>
            <p className="text-gray-600 line-clamp-2">
              {profile.businessInfo.description}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
                <Store size={14} />
                {profile.businessInfo.category}
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1">
                <Star size={14} />
                {profile.businessInfo.rating.toFixed(1)}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-1">
                <ShoppingBag size={14} />
                {profile.businessInfo.totalSales} Sales
              </span>
            </div>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow flex items-center gap-2">
            <Pencil size={16} />
            Edit Store
          </button>
        </div>
      </div>

      {/* Store Content */}
      <Tabs
        defaultValue="dashboard"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-white rounded-lg p-1 shadow-md w-full justify-start overflow-x-auto">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <TrendingUp size={16} />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package size={16} />
            Products
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart size={16} />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="dashboard"
          className="bg-white rounded-xl shadow-md p-6 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-sm text-blue-600 font-medium flex items-center gap-2">
                <TrendingUp size={16} />
                Total Revenue
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {formatCurrency(profile.businessInfo.revenue)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-sm text-green-600 font-medium flex items-center gap-2">
                <ShoppingBag size={16} />
                Total Sales
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {profile.businessInfo.totalSales}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-sm text-purple-600 font-medium flex items-center gap-2">
                <Package size={16} />
                Products
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {profile.products.length}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Monthly Revenue
              </h3>
              {renderChart(profile.analytics.monthlyRevenue, "bg-blue-500")}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Top Products
                </h3>
                <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                  <Plus size={14} />
                  Add New Product
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.analytics.topProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-all group"
                  >
                    <div className="relative w-full aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800">
                        {product.name}
                      </h4>
                      <p className="text-green-600 font-semibold mt-1">
                        {formatCurrency(product.price)}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          Stock: {product.stock}
                        </span>
                        <span className="text-sm text-blue-600">
                          Sold: {product.sold}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="products"
          className="bg-white rounded-xl shadow-md p-6 transition-all"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Package className="text-blue-600" />
              Products
            </h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
              <Plus size={16} />
              Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-white/90 text-blue-600 text-xs font-medium rounded-full px-2 py-1 shadow-sm">
                      {product.sold} sold
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <p className="text-green-600 font-semibold mt-1">
                    {formatCurrency(product.price)}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                    <div className="relative w-full max-w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (product.stock / (product.stock + product.sold)) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-blue-100 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-200 transition-colors flex items-center justify-center gap-1 font-medium">
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button className="flex-1 bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-200 transition-colors flex items-center justify-center gap-1 font-medium">
                      <Trash size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="analytics"
          className="bg-white rounded-xl shadow-md p-6 transition-all"
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <TrendingUp className="text-blue-600" />
                Revenue Overview
              </h3>
              <div className="bg-white border rounded-lg p-6">
                {renderChart(profile.analytics.monthlyRevenue, "bg-blue-500")}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">Last 6 Months Revenue</p>
                  <p className="text-xl font-bold text-gray-800 mt-1">
                    {formatCurrency(
                      profile.analytics.monthlyRevenue.reduce(
                        (a, b) => a + b,
                        0
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <ShoppingBag className="text-green-600" />
                Sales Overview
              </h3>
              <div className="bg-white border rounded-lg p-6">
                {renderChart(profile.analytics.monthlySales, "bg-green-500")}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">Last 6 Months Sales</p>
                  <p className="text-xl font-bold text-gray-800 mt-1">
                    {profile.analytics.monthlySales.reduce((a, b) => a + b, 0)}{" "}
                    Units
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Star className="text-yellow-500" />
                Top Performing Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {profile.analytics.topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-all group"
                  >
                    <div className="relative">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span
                          className={`w-8 h-8 flex items-center justify-center text-white font-bold rounded-full ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : "bg-amber-700"
                          }`}
                        >
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800">
                        {product.name}
                      </h4>
                      <p className="text-green-600 font-semibold mt-1">
                        {formatCurrency(product.price)}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          Stock: {product.stock}
                        </span>
                        <span className="text-sm text-blue-600">
                          Sold: {product.sold}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Total Revenue:</span>
                          <span className="font-medium text-gray-800">
                            {formatCurrency(product.price * product.sold)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="settings"
          className="bg-white rounded-xl shadow-md p-6 transition-all"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <Settings className="text-gray-600" />
            Store Settings
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  defaultValue={profile.businessInfo.storeName}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  defaultValue={profile.businessInfo.category}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                defaultValue={profile.businessInfo.description}
                rows={3}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2"
              />
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue={profile.email}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue={profile.phone}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Address
                </label>
                <textarea
                  defaultValue={profile.address}
                  rows={3}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2"
                />
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Store Branding</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={profile.avatar || "/api/placeholder/96/96"}
                    alt={profile.businessInfo.storeName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700 mb-2">Store Logo</p>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Change Logo
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
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
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
