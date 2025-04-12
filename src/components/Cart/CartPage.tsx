// components/Cart/CartPage.tsx
import React from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              updateCart={updateCart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CartPage;
