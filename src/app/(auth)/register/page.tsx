"use client";

import Link from "next/link";
import { RegisterFormValues } from "@/lib/validation/registerSchema";
import { useState } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values: RegisterFormValues) => {
    console.log("Register payload:", values);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error || "Registration failed");
        return;
      }
      toast.success(
        `Account created for ${values.email || values.name}! Please log in.`
      );
      router.push(`/login?email=${encodeURIComponent(values.email)}`);
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
        <RegisterForm isLoading={isLoading} onSubmit={handleRegister} />
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
