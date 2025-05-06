"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/CheckBox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { calculateFeaturedPrice } from "./FeaturedPrice";

// Updated to use numeric durations
const durations = [
  { label: "24 Hours", value: 24, percent: 0.001, max: 5000 },
  { label: "1 Week", value: 168, percent: 0.005, max: 50000 }, // 7 days = 168 hours
  { label: "1 Month", value: 720, percent: 0.01, max: 100000 }, // 30 days = 720 hours
];

// Interface update to match API expectations
interface MarketingModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onPromotionUpdate: (promotionData: {
    isFeatured?: boolean;
    isNewArrival?: boolean;
    isBestSeller?: boolean;
    isOnSale?: boolean;
    duration?: number; // Now uses number
    price?: number;
  }) => void;
}

const MarketingModal = ({
  isOpen,
  onClose,
  product,
  onPromotionUpdate,
}: MarketingModalProps) => {
  const router = useRouter();
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    if (duration) {
      const calculated = calculateFeaturedPrice({
        price: product.price,
        duration: duration,
      });
      setPrice(calculated);
    } else {
      setPrice(0);
    }
  }, [duration, product.price]);

  const handleCheckout = () => {
    const payload = {
      productId: product.id,
      duration,
      price,
      labels: selectedLabels,
    };

    onPromotionUpdate({
      isFeatured: selectedLabels.includes("Featured"),
      isNewArrival: selectedLabels.includes("New Arrival"),
      isBestSeller: selectedLabels.includes("Best Seller"),
      isOnSale: selectedLabels.includes("On Sale"),
      duration,
      price,
    });

    router.push(
      `/dashboard/marketing/checkout?data=${encodeURIComponent(
        JSON.stringify(payload)
      )}`
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Set Promotion for {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Featured Duration Section */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              🟡 Featured Duration (affects isFeatured)
            </Label>
            <RadioGroup
              value={duration ? String(duration) : ""}
              onValueChange={(value) => setDuration(Number(value))}
              className="space-y-2"
            >
              {durations.map((d) => (
                <div
                  key={d.value}
                  className="flex items-center space-x-2 p-2 rounded border border-gray-200 hover:border-gray-300 cursor-pointer"
                >
                  <RadioGroupItem
                    value={String(d.value)}
                    id={String(d.value)}
                  />
                  <Label htmlFor={String(d.value)} className="text-sm">
                    {d.label} –{" "}
                    <span className="font-medium text-gray-800">
                      {calculateFeaturedPrice({
                        price: product.price,
                        duration: d.value,
                      }).toLocaleString()}{" "}
                      IDR
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Labels Section */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              🏷️ Labels (free)
            </Label>
            {["Featured", "New Arrival", "Best Seller", "On Sale"].map(
              (label) => (
                <div
                  key={label}
                  className="flex items-center space-x-2 p-2 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <Checkbox
                    id={label}
                    checked={selectedLabels.includes(label)}
                    onCheckedChange={() => toggleLabel(label)}
                  />
                  <Label htmlFor={label} className="text-sm">
                    {label}
                  </Label>
                </div>
              )
            )}
          </div>

          {/* Price Summary */}
          <div className="pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Cost:</span>
              <span className="font-medium">
                {price > 0
                  ? `${price.toLocaleString()} IDR`
                  : "Free (Labels Only)"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-4 py-2 text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCheckout}
              disabled={!duration && selectedLabels.length === 0}
              className="px-4 py-2 text-sm"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarketingModal;
