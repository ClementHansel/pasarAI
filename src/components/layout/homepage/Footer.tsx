"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 mt-12 border-t">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Company</h3>
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
          <h3 className="text-lg font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Security</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-2">
            Get the latest news and offers.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2 border border-gray-300 rounded-l-md"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
