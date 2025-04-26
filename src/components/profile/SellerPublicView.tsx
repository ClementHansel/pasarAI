// src/components/seller/SellerPublicProfile.tsx
"use client";

import Image from "next/image";
import { Star, Store, Phone, Mail, MapPin, Package } from "lucide-react";
import SellerProductCard from "../seller/SellerProductCard";

interface SellerPublicProfileProps {
  seller: PublicSellerProfile;
  id: string;
}

const SellerPublicProfile = ({ seller }: SellerPublicProfileProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Seller Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={seller.avatar}
              alt={seller.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {seller.name}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{seller.description}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 text-blue-600" />
                <span className="font-medium">
                  {seller.rating.toFixed(1)}/5.0 Rating
                </span>
              </div>

              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                <Store className="w-5 h-5 text-green-600" />
                <span className="font-medium">
                  {seller.totalSales} Total Sales
                </span>
              </div>

              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="font-medium">
                  {seller.products.length} Products
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seller.contact.address && (
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Address</h3>
                <p className="text-gray-600">{seller.contact.address}</p>
              </div>
            </div>
          )}

          {seller.contact.phone && (
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">{seller.contact.phone}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Email</h3>
              <p className="text-gray-600">{seller.contact.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seller.products.map((product) => (
            <SellerProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerPublicProfile;
