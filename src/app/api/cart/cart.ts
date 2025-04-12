// src/app/api/cart/cart.ts
import { getSession, setSession } from "@/lib/session/session";
import { NextApiRequest, NextApiResponse } from "next";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const getCartFromSession = (req: NextApiRequest): CartItem[] => {
  const session = getSession(req);
  return session?.cart || [];
};

const saveCartToSession = (req: NextApiRequest, cart: CartItem[]): void => {
  const session = getSession(req);
  session.cart = cart;
  setSession(req, session);
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  let cart = getCartFromSession(req);

  switch (req.method) {
    case "GET":
      return res.status(200).json(cart);

    case "POST": {
      const { id, name, price, quantity }: CartItem = req.body;
      if (!id || !name || price === undefined || quantity === undefined) {
        return res
          .status(400)
          .json({ message: "Missing required cart item data" });
      }

      const existingItemIndex = cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push({ id, name, price, quantity });
      }

      saveCartToSession(req, cart);
      return res.status(200).json(cart);
    }

    case "DELETE": {
      const { removeId } = req.body;
      if (!removeId) {
        return res.status(400).json({ message: "Missing item ID to remove" });
      }

      cart = cart.filter((item) => item.id !== removeId);
      saveCartToSession(req, cart);
      return res.status(200).json(cart);
    }

    case "PATCH": {
      const {
        updateId,
        newQuantity,
      }: { updateId: string; newQuantity: number } = req.body;
      if (!updateId || newQuantity === undefined) {
        return res
          .status(400)
          .json({ message: "Missing required data to update quantity" });
      }

      const itemIndex = cart.findIndex((item) => item.id === updateId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      if (newQuantity <= 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be greater than 0" });
      }

      cart[itemIndex].quantity = newQuantity;
      saveCartToSession(req, cart);
      return res.status(200).json(cart);
    }

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
