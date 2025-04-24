// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // Save authentication data
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      // Corrected error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to your account
          </p>
        </div>

        {/* Login Form Component */}
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
