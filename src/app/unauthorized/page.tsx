// src/app/unauthorized/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have the necessary permissions to view this page.
        </p>
        <div className="space-x-4">
          <Link href="/">
            <p className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Go to Homepage
            </p>
          </Link>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
