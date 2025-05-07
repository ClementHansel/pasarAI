// src/app/layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
<<<<<<< HEAD
import Logo from "@/components/layout/homepage/header/Logo";
import SearchBox from "@/components/layout/homepage/header/SearchBox";
import CartPopover from "@/components/layout/homepage/header/CartPopover";
import MessagePopover from "@/components/layout/homepage/header/MessagePopover";
import UserMenuPopover from "@/components/layout/homepage/header/UserMenuPopover";
import NotificationPopover from "@/components/layout/homepage/header/NotificationPopover";
import { Link } from "lucide-react";
=======
import Header from "@/components/layout/homepage/header/Header";
import Footer from "@/components/layout/homepage/Footer";
import { WalletProvider } from "@/context/WalletContext";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "@/context/SearchContext";

// Import floating widgets container
import FloatingWidgetContainer from "@/components/floating/FloatingWidgetContainer";
>>>>>>> 6ade732fe3b0717f0fc5e7faf51b1b305019f520

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen flex flex-col`}
      >
<<<<<<< HEAD
        {/* HEADER */}
        <header className="w-full p-4 bg-gray-100 shadow-md flex justify-between items-center">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <Logo />

            <div className="flex-1 max-w-xl">
              <SearchBox />
            </div>

            <div className="flex items-center gap-4">
              <CartPopover />
              <MessagePopover />
              <NotificationPopover />
              <UserMenuPopover />

              <nav className="flex items-center gap-6">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h4V3h10v7h4v11H3V10z"
                    />
                  </svg>
                  Dashboard
                </Link>
              </nav>
            </div>
          </div>
          {/* Add nav or cart icon here if needed */}
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-grow container mx-auto p-4">{children}</main>

        {/* FOOTER */}
        <footer className="w-full p-4 bg-gray-100 text-center text-sm">
          © {new Date().getFullYear()} PasarAI. All rights reserved.
        </footer>
=======
        <SessionProvider>
          <SearchProvider>
            <Header />
            <main className="flex-grow">
              <WalletProvider>{children}</WalletProvider>
            </main>
            <Footer />
            <FloatingWidgetContainer />
          </SearchProvider>
        </SessionProvider>
>>>>>>> 6ade732fe3b0717f0fc5e7faf51b1b305019f520
      </body>
    </html>
  );
}
