// src/components/layout/homepage/header/UserMenuPopover.tsx

import React from "react";
import { User, LogOut, Settings, ShoppingBag } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Role } from "@prisma/client";
import Image from "next/image";

const UserMenuPopover = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === Role.ADMIN;
  const isSeller = session?.user?.role === Role.SELLER;
  
  return (
    <Popover>
      <PopoverTrigger className="relative">
        {session?.user?.hasProfile ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image 
              src={session?.user?.image || "/placeholder-avatar.png"} 
              alt="Profile" 
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        ) : (
          <User className="w-6 h-6 text-gray-700" />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        {isAuthenticated ? (
          <>
            <div className="mb-4">
              <h4 className="font-semibold">{session.user.email}</h4>
              <p className="text-sm text-gray-500">
                {session.user.role.charAt(0) + session.user.role.slice(1).toLowerCase()}
              </p>
            </div>
            <ul className="text-sm space-y-1">
              {isAdmin && (
                <li
                  className="flex items-center gap-2 hover:text-primary cursor-pointer py-1.5"
                  onClick={() => router.push("/admin/dashboard")}
                >
                  <Settings className="w-4 h-4" />
                  Admin Dashboard
                </li>
              )}
              
              {(isSeller || isAdmin) && (
                <li
                  className="flex items-center gap-2 hover:text-primary cursor-pointer py-1.5"
                  onClick={() => router.push("/seller/dashboard")}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Seller Dashboard
                </li>
              )}
              
              <li
                className="flex items-center gap-2 hover:text-primary cursor-pointer py-1.5"
                onClick={() => router.push("/dashboard")}
              >
                <User className="w-4 h-4" />
                My Dashboard
              </li>
              
              <li
                className="flex items-center gap-2 hover:text-primary cursor-pointer py-1.5"
                onClick={() => router.push("/profile")}
              >
                <Settings className="w-4 h-4" />
                Profile Settings
              </li>
              
              <li
                className="flex items-center gap-2 hover:text-primary cursor-pointer py-1.5 text-red-500 hover:text-red-600"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </li>
            </ul>
          </>
        ) : (
          <>
            <h4 className="font-semibold mb-2">Account</h4>
            <ul className="text-sm space-y-1">
              <li
                className="hover:text-primary cursor-pointer py-1.5"
                onClick={() => router.push("/login")}
              >
                Login
              </li>
              <li
                className="hover:text-primary cursor-pointer py-1.5"
                onClick={() => router.push("/register")}
              >
                Register
              </li>
            </ul>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default UserMenuPopover;