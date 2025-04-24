// src/app/profile/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would check if the user is logged in
    // and redirect to the appropriate profile page based on user type
    // For demo purposes, we'll provide options to view either profile
    // In a production app, you'd redirect directly to the correct profile
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Profile Selection
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please select which profile type you&apos;d like to view:
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => router.push("/profile/user")}
            className="border rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="font-medium text-lg mb-1">User Profile</h2>
            <p className="text-sm text-gray-500">
              View customer profile with orders and wishlist
            </p>
          </div>

          <div
            onClick={() => router.push("/profile/seller")}
            className="border rounded-lg p-6 cursor-pointer hover:border-green-500 hover:shadow-md transition-all text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="font-medium text-lg mb-1">Seller Profile</h2>
            <p className="text-sm text-gray-500">
              View seller dashboard with analytics and products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
