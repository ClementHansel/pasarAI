// src/components/layout/homepage/HeroSection.tsx
"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/images/carousel/slide1.jpg",
    title: "New Arrivals",
    description: "Check out our latest collection",
    link: "/products/new-arrivals",
  },
  {
    id: 2,
    image: "/images/carousel/slide2.jpg",
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    link: "/products/sale",
  },
  {
    id: 3,
    image: "/images/carousel/slide3.jpg",
    title: "Featured Products",
    description: "Discover our most popular items",
    link: "/products/featured",
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => (
            <Link
              href={slide.link}
              key={slide.id}
              className="embla__slide relative flex-[0_0_100%] min-w-0"
            >
              <div className="relative h-[500px] w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl mb-8">{slide.description}</p>
                    <button className="bg-white text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSection;
