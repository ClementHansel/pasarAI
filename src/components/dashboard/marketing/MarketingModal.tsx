"use client";

import { useEffect, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/CheckBox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { PromotionData } from "@/types/marketing";

interface MarketingModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onPromotionUpdate: (promotionData: PromotionData) => void;
}

const durations = [
  { label: "24 Hours", value: "24h", percent: 0.001, max: 5000 },
  { label: "1 Week", value: "1w", percent: 0.005, max: 50000 },
  { label: "1 Month", value: "1m", percent: 0.01, max: 100000 },
];

const MarketingModal = ({ isOpen, onClose, product }: MarketingModalProps) => {
  const router = useRouter();
  const [duration, setDuration] = useState<string | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    const selected = durations.find((d) => d.value === duration);
    if (selected) {
      const calculated = Math.min(
        product.price * selected.percent,
        selected.max
      );
      setPrice(Math.round(calculated));
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

    // Redirect to a checkout page or send to an API
    router.push(
      `/dashboard/marketing/checkout?data=${encodeURIComponent(
        JSON.stringify(payload)
      )}`
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Promotion for {product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Featured Duration */}
          <div>
            <Label className="mb-2 block">
              🟡 Featured Duration (affects isFeatured)
            </Label>
            <RadioGroup value={duration ?? ""} onValueChange={setDuration}>
              {durations.map((d) => (
                <div key={d.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={d.value} id={d.value} />
                  <Label htmlFor={d.value}>
                    {d.label} –{" "}
                    {Math.min(
                      product.price * d.percent,
                      d.max
                    ).toLocaleString()}{" "}
                    IDR
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Free Labels */}
          <div>
            <Label className="mb-2 block">🏷️ Labels (free)</Label>
            {["New Arrival", "Best Seller", "On Sale"].map((label) => (
              <div key={label} className="flex items-center space-x-2">
                <Checkbox
                  id={label}
                  checked={selectedLabels.includes(label)}
                  onCheckedChange={() => toggleLabel(label)}
                />
                <Label htmlFor={label}>{label}</Label>
              </div>
            ))}
          </div>

          {/* Price & Actions */}
          <div className="text-sm text-gray-600">
            <strong>Total Price:</strong>{" "}
            {price > 0 ? `${price.toLocaleString()} IDR` : "Free (Labels Only)"}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={!duration && selectedLabels.length === 0}
              onClick={handleCheckout}
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
