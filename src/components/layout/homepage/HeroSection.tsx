// src/components/layout/homepage/HeroSection.tsx

"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-blue-500 text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Our Online Store!
        </h1>
        <p className="text-lg mb-8">
          Shop the latest products and get them delivered to your doorstep.
        </p>
        <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg text-xl">
          Shop Now
        </button>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}
      ></div>
    </section>
  );
};

export default HeroSection;
