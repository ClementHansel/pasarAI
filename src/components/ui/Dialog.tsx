// src/components/ui/Dialog.tsx
"use client";

import { useEffect } from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-xl max-w-[95vw] max-h-[90vh] overflow-auto animate-in zoom-in-95">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
