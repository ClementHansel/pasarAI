import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PasarAI",
  description: "Marketplace for exporting local produce",
};

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
        <CartProvider>
          {/* HEADER */}
          <header className="w-full p-4 bg-gray-100 shadow-md flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              PasarAI
            </Link>
            {/* Add nav or cart icon here if needed */}
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-grow container mx-auto p-4">{children}</main>

          {/* FOOTER */}
          <footer className="w-full p-4 bg-gray-100 text-center text-sm">
            © {new Date().getFullYear()} PasarAI. All rights reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
