// src/lib/dashboard/orders/orders.ts
import { Order } from "@/types/order";
import { withSellerAuth } from "@/lib/middleware"; // Import middleware for seller authentication
import { Product } from "@/types/product"; // Assuming you have a Product type
import { NextResponse } from "next/server"; // Import NextResponse for returning response

// Mock function to fetch product details (replace with actual API call)
async function getProductById(productId: string): Promise<Product | null> {
  try {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    return null; // Return null if the fetch fails
  }
}

export const getSellerOrders = withSellerAuth(async (req) => {
  const sellerId = req.user?.id; // Get the seller's ID from the authenticated request

  if (!sellerId) {
    return NextResponse.json({ error: "Seller ID not found" }, { status: 400 });
  }

  try {
    // Fetch orders for the seller
    const res = await fetch(`/api/orders?sellerId=${sellerId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch seller orders" },
        { status: 500 }
      );
    }

    const orders: Order[] = await res.json();

    // Map through the orders and cart items, fetch product details for each item
    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const updatedCart = await Promise.all(
          order.cart.map(async (item) => {
            const product = await getProductById(item.productId);
            return {
              ...item,
              product: product || {}, // If no product found, return an empty object
            };
          })
        );
        return {
          ...order,
          cart: updatedCart,
        };
      })
    );

    // Return the updated orders as a JSON response
    return NextResponse.json(updatedOrders);
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch seller orders due to server error" },
      { status: 500 }
    );
  }
});
