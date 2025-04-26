// src/components/product/ProductImages.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImages({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Main Image */}
      <div className="lg:order-2 lg:col-span-4 relative group">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 relative">
          <Image
            src={images[selectedImage]}
            alt={`Product image ${selectedImage + 1}`}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev > 0 ? prev - 1 : images.length - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev < images.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 lg:flex-col lg:col-span-1 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 w-20 min-w-[5rem] rounded-lg border-2 overflow-hidden transition-all ${
                selectedImage === index
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
