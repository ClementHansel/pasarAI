// src/app/api/cart/cart.ts
import { getSession, setSession } from "@/lib/session/session";
import { NextApiRequest, NextApiResponse } from "next";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SessionWithCart {
  cart: CartItem[];
  [key: string]: unknown;
}

// Get the cart from the session, ensuring it's typed correctly
const getCartFromSession = (req: NextApiRequest): CartItem[] => {
  const session = getSession(req) as SessionWithCart; // Typecasting the session to ensure it has a cart
  return Array.isArray(session?.cart) ? session.cart : [];
};

// Save the cart to the session
const saveCartToSession = (req: NextApiRequest, cart: CartItem[]): void => {
  const session = getSession(req) as SessionWithCart; // Typecasting session to ensure the cart exists
  session.cart = cart;
  setSession(req, session);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Use const as cart is not reassigned
    const cart = getCartFromSession(req);

    switch (req.method) {
      case "GET":
        return res.status(200).json(cart);

      case "POST": {
        const { id, name, price, quantity }: CartItem = req.body;

        if (
          !id ||
          !name ||
          typeof price !== "number" ||
          typeof quantity !== "number"
        ) {
          return res
            .status(400)
            .json({ message: "Missing or invalid cart item data" });
        }

        const existingItem = cart.find((item) => item.id === id);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({ id, name, price, quantity });
        }

        saveCartToSession(req, cart);
        return res.status(200).json(cart);
      }

      case "DELETE": {
        const { removeId }: { removeId: string } = req.body;

        if (!removeId) {
          return res.status(400).json({ message: "Missing item ID to remove" });
        }

        const updatedCart = cart.filter((item) => item.id !== removeId);

        if (updatedCart.length === cart.length) {
          return res.status(404).json({ message: "Item not found in cart" });
        }

        saveCartToSession(req, updatedCart);
        return res.status(200).json(updatedCart);
      }

      case "PATCH": {
        const {
          updateId,
          newQuantity,
        }: { updateId: string; newQuantity: number } = req.body;

        if (!updateId || typeof newQuantity !== "number") {
          return res
            .status(400)
            .json({ message: "Missing or invalid data to update quantity" });
        }

        if (newQuantity <= 0) {
          return res
            .status(400)
            .json({ message: "Quantity must be greater than 0" });
        }

        const item = cart.find((item) => item.id === updateId);

        if (!item) {
          return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = newQuantity;

        saveCartToSession(req, cart);
        return res.status(200).json(cart);
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        return res
          .status(405)
          .json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("Cart API error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
