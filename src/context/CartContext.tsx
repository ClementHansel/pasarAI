import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define the types for the cart item
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCart: (id: string, quantity: number) => void;
}

// Toggle this to use API or just localStorage (for demo/dev flexibility)
const USE_API = false;

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage or API on initial render
  useEffect(() => {
    const loadCart = async () => {
      if (USE_API) {
        try {
          const res = await fetch("/api/cart");
          const data = await res.json();
          setCart(data);
        } catch (error) {
          console.error("Failed to load cart from API:", error);
        }
      } else {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };
    loadCart();
  }, []);

  // Save to localStorage when cart changes (only when not using API)
  useEffect(() => {
    if (!USE_API) {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        localStorage.removeItem("cart");
      }
    }
  }, [cart]);

  const addToCart = async (item: CartItem) => {
    if (USE_API) {
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        const updated = await res.json();
        setCart(updated);
      } catch (error) {
        console.error("Failed to add item via API:", error);
      }
    } else {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) => cartItem.id === item.id
        );
        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += item.quantity;
          return updatedCart;
        } else {
          return [...prevCart, item];
        }
      });
    }
  };

  const removeFromCart = async (id: string) => {
    if (USE_API) {
      try {
        const res = await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ removeId: id }),
        });
        const updated = await res.json();
        setCart(updated);
      } catch (error) {
        console.error("Failed to remove item via API:", error);
      }
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  };

  const clearCart = () => {
    if (USE_API) {
      // For simplicity, manually clear item by item
      cart.forEach((item) => removeFromCart(item.id));
    } else {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const updateCart = async (id: string, quantity: number) => {
    if (USE_API) {
      try {
        const res = await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updateId: id, newQuantity: quantity }),
        });
        const updated = await res.json();
        setCart(updated);
      } catch (error) {
        console.error("Failed to update item via API:", error);
      }
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
