"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ProductFilterContextType = {
  category: string | null;
  setCategory: (category: string | null) => void;
  market: string | null;
  setMarket: (market: string | null) => void;
};

const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

export const ProductFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [category, setCategory] = useState<string | null>(null);
  const [market, setMarket] = useState<string | null>(null);

  return (
    <ProductFilterContext.Provider
      value={{ category, setCategory, market, setMarket }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilter = () => {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error(
      "useProductFilter must be used within a ProductFilterProvider"
    );
  }
  return context;
};
