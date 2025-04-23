// src/components/layout/homepage/HeroSection.tsx

"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SkeletonCard from "../../ui/SkeletonCard";

// Do NOT import picture-not-found.png; use its absolute public path.
const pictureNotFound = "/images/picture-not-found.png";

const slides: {
  id: number;
  image: string | null;
  title: string;
  description: string;
  link: string;
}[] = [
  {
    id: 1,
    image: null,
    title: "New Arrivals",
    description: "Check out our latest collection",
    link: "/products/new-arrivals",
  },
  {
    id: 2,
    image: null,
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    link: "/products/sale",
  },
  {
    id: 3,
    image: null,
    title: "Featured Products",
    description: "Discover our most popular items",
    link: "/products/featured",
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [loading, setLoading] = React.useState(true);

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
    }, 10000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

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
                  src={slide.image || pictureNotFound}
                  alt={slide.title}
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="100vw"
                  // No onError needed – Next.js handles fallback if the png is missing
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
