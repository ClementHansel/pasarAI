// New page for social login profile completion
"use client";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { RegisterFormValues } from "@/lib/validation/registerSchema";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React from "react";

export default function CompleteProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Only allow access if user is logged in via social
  // Move redirect logic to useEffect to avoid SSR issues
  React.useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  // Handler for profile completion (reuse RegisterForm, hide password field)
  const handleComplete = async (values: RegisterFormValues) => {
    // Call API to update user profile
    const res = await fetch("/api/auth/complete-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      toast.success("Profile completed!");
      router.push("/");
    } else {
      toast.error("Failed to complete profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Complete Your Profile
        </h2>
        {/* Only id, email, and role are available by default. To use name/profileImage, extend NextAuth callbacks and types. */}
        <RegisterForm
          isLoading={false}
          onSubmit={handleComplete}
          hidePasswordField={true}
          initialValues={{
            email: session.user.email || "",
            role:
              session.user.role === "SELLER" || session.user.role === "BUYER"
                ? session.user.role
                : "BUYER",
            // name/profileImage can be added if you extend NextAuth session
          }}
        />
      </div>
    </div>
  );
}
