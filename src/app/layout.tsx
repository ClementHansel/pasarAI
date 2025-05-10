// src/app/layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/homepage/header/Header";
import Footer from "@/components/layout/homepage/Footer";
import { WalletProvider } from "@/context/WalletContext";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "@/context/SearchContext";
import { ProductFilterProvider } from "@/context/ProductCategoryContext";

// Import floating widgets container
import FloatingWidgetContainer from "@/components/floating/FloatingWidgetContainer";

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
        <SessionProvider>
          <SearchProvider>
            <ProductFilterProvider>
              <Header />
              <main className="flex-grow">
                <WalletProvider>{children}</WalletProvider>
              </main>
              <Footer />
            </ProductFilterProvider>
            <FloatingWidgetContainer />
          </SearchProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
