"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
    role: "CONSUMER" | "SELLER";
    referralCode?: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Registration failed");
      }

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our marketplace and start shopping or selling
          </p>
        </div>

        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
