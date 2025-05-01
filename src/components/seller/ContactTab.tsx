// src/components/seller/ContactTab.tsx
"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { PublicSellerProfile } from "@/lib/data/profile";

interface ContactTabProps {
  seller: PublicSellerProfile;
}

export const ContactTab = ({ seller }: ContactTabProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
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

    {seller.markets.length > 0 && (
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-xl font-bold mb-4">Market Locations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seller.markets.map((market) => (
            <div
              key={market}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <MapPin className="w-5 h-5 text-gray-600" />
              <span>{market}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
