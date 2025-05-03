// src/components/product/ProductImages.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog } from "../ui/Dialog";

export default function ProductImages({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const visibleImages = images.slice(startIndex, startIndex + 3);

  const handleNext = () => {
    if (startIndex + 3 < images.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="grid gap-4 group">
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in">
          <Image
            src={images[selectedImage]}
            alt={`${name} - Main product image`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
            onClick={() => setIsZoomed(true)}
          />

          <button
            className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
            onClick={() => setIsZoomed(true)}
            aria-label="zoom main image"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Grid */}
        <div className="relative grid grid-cols-3 gap-4">
          {images.length > 3 && (
            <>
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md hover:bg-white z-10 disabled:opacity-50"
                aria-label="previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex + 3 >= images.length}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md hover:bg-white z-10 disabled:opacity-50"
                aria-label="next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {visibleImages.map((image, index) => {
            const actualIndex = startIndex + index;
            return (
              <button
                key={actualIndex}
                onClick={() => setSelectedImage(actualIndex)}
                className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                  selectedImage === actualIndex
                    ? "border-primary ring-2 ring-primary"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                aria-label="set main image"
              >
                <Image
                  src={image}
                  alt={`${name} - Thumbnail ${actualIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Zoom Modal */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <div className="relative w-full max-w-4xl aspect-square">
          <Image
            src={images[selectedImage]}
            alt={`${name} - Zoomed view`}
            fill
            className="object-contain"
          />
        </div>
      </Dialog>
    </>
  );
}
