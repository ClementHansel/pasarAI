// src/context/SearchContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categories: { name: string }[];
  brand: { name: string };
}

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  submitSearch: () => void;
  results: Product[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const submitSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`/api/searchbox?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok) {
        setResults(data.results); // Store the search results
      } else {
        console.error("Error searching:", data.error);
        setResults([]); // Clear results if there was an error
      }
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]); // Clear results on failure
    }
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, submitSearch, results }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
