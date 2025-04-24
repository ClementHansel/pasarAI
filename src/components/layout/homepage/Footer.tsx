"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return (
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} PasarAI. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="hover:text-gray-700">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/terms" className="hover:text-gray-700">
            Terms of Service
          </a>
          <span>•</span>
          <a href="/help" className="hover:text-gray-700">
            Help Center
          </a>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-100 py-10 border-t">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">About PasarAI</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Contact Us</li>
            <li>Order Tracking</li>
            <li>Returns</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Seller Center</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Sell on PasarAI</li>
            <li>Seller Portal</li>
            <li>Seller Guidelines</li>
            <li>Success Stories</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Download Our App</h3>
          <p className="text-sm text-gray-600 mb-2">
            Get the best shopping experience on our mobile app
          </p>
          <div className="flex flex-col space-y-2">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              App Store
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              Google Play
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 pt-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} PasarAI. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Terms of Service
              </a>
              <a
                href="/help"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
