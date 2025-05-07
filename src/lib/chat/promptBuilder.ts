// src/lib/chat/promptBuilder.ts

import {
  SalesAnalytics,
  ReturnAnalytics,
  CustomerAnalytics,
  RevenueAnalytics,
  CartAnalytics,
  CheckoutAnalytics,
  ProductAnalytics,
  WishlistAnalytics,
} from "src/types/ai/analyticsTypes";
import { getSalesAnalytics } from "../../lib/data/analytics/salesAnalytics";
import { getReturnsAnalytics } from "../../lib/data/analytics/returnsAnalytics";
import { getCustomerAnalytics } from "../../lib/data/analytics/customerAnalytics";
import { getRevenueAnalytics } from "../../lib/data/analytics/revenueAnalytics";
import { getCartAnalytics } from "../../lib/data/analytics/cartAnalytics";
import { getCheckoutAnalytics } from "../../lib/data/analytics/checkoutAnalytics";
import { getProductAnalytics } from "../../lib/data/analytics/productAnalytics";
import { getWishlistAnalytics } from "../../lib/data/analytics/wishlistAnalytics";

// Function to generate a prompt for AI based on sales analytics
export async function buildSalesPrompt() {
  const salesData: SalesAnalytics[] = await getSalesAnalytics();

  const latestSales = salesData[0]; // Get the most recent data
  const prompt = `
    Based on the latest sales data from ${
      latestSales.date
    }, summarize the sales performance:
    - Total Orders: ${latestSales.totalOrders}
    - Total Units Sold: ${latestSales.totalUnitsSold}
    - Top Category: ${latestSales.topCategory}
    - Top Product: ${latestSales.topProduct}
    - Average Order Value: $${latestSales.avgOrderValue.toFixed(2)}
    
    Provide insights on trends, potential areas for improvement, and sales strategies.
  `;
  return prompt;
}

// Function to generate a prompt for AI based on returns analytics
export async function buildReturnsPrompt() {
  const returnsData: ReturnAnalytics[] = await getReturnsAnalytics();

  const latestReturns = returnsData[0]; // Get the most recent data
  const prompt = `
    Based on the latest returns data from ${latestReturns.date}, summarize the return patterns:
    - Total Returns: ${latestReturns.totalReturns}
    - Return Rate: ${latestReturns.returnRate}%
    - Most Returned Category: ${latestReturns.mostReturnedCategory}
    - Most Common Return Reason: ${latestReturns.mostReturnedReason}
    
    Provide insights on product quality, customer satisfaction, and suggestions for reducing returns.
  `;
  return prompt;
}

// Function to generate a prompt for AI based on customer analytics
export async function buildCustomerPrompt() {
  const customerData: CustomerAnalytics[] = await getCustomerAnalytics();

  const latestCustomer = customerData[0]; // Get the most recent data
  const prompt = `
    Based on the latest customer data from ${latestCustomer.date}, summarize customer engagement:
    - New Customers: ${latestCustomer.newCustomers}
    - Returning Customers: ${latestCustomer.returningCustomers}
    - Churn Rate: ${latestCustomer.churnRate}%
    - Customer Satisfaction Score: ${latestCustomer.satisfactionScore}/10
    
    Provide insights on retention strategies, potential reasons for churn, and recommendations for improving customer satisfaction.
  `;
  return prompt;
}

// Function to generate a prompt for AI based on revenue analytics
export async function buildRevenuePrompt() {
  const revenueData: RevenueAnalytics[] = await getRevenueAnalytics();

  const latestRevenue = revenueData[0]; // Get the most recent data
  const prompt = `
    Based on the latest revenue data from ${latestRevenue.date}, summarize the financial performance:
    - Total Revenue: $${latestRevenue.totalRevenue}
    - Gross Profit: $${latestRevenue.grossProfit}
    - Net Profit: $${latestRevenue.netProfit}
    - Profit Margin: ${latestRevenue.profitMargin}%
    
    Provide insights on profitability, potential cost-saving strategies, and recommendations for boosting revenue.
  `;
  return prompt;
}

// Function to generate a prompt for AI based on cart analytics
export async function buildCartPrompt() {
  const cartData: CartAnalytics[] = await getCartAnalytics();

  const latestCart = cartData[0]; // Get the most recent data
  const prompt = `
    Based on the latest cart data from ${
      latestCart.date
    }, summarize cart trends:
    - Total Carts Created: ${latestCart.totalCartsCreated}
    - Abandoned Carts: ${latestCart.abandonedCarts}
    - Most Popular Product: ${latestCart.mostPopularProduct}
    - Average Cart Value: $${latestCart.avgCartValue.toFixed(2)}
    
    Provide insights on abandoned carts, and suggest strategies to increase cart conversions.
  `;
  return prompt;
}

// Function to generate a prompt for AI based on checkout analytics
export async function buildCheckoutPrompt() {
  const checkoutData: CheckoutAnalytics[] = await getCheckoutAnalytics();

  const latestCheckout = checkoutData[0]; // Get the most recent data
  const prompt = `
    Based on the latest checkout data from ${latestCheckout.date}, summarize checkout performance:
    - Total Checkouts: ${latestCheckout.totalCheckouts}
    - Completed Checkouts: ${latestCheckout.completedCheckouts}
    - Payment Method Preference: ${latestCheckout.paymentMethodPreference}
    - Checkout Abandonment Rate: ${latestCheckout.abandonmentRate}%
    
    Provide insights on optimizing the checkout process and suggestions to reduce abandonment rates.
  `;
  return prompt;
}

// Function to generate a prompt for AI based on product analytics
export async function buildProductPrompt() {
  const productData: ProductAnalytics[] = await getProductAnalytics();

  const latestProduct = productData[0]; // Get the most recent data
  const prompt = `
    Based on the latest product data from ${latestProduct.date}, summarize product performance:
    - Total Products Sold: ${latestProduct.totalProductsSold}
    - Top Product: ${latestProduct.topProduct}
    - Most Popular Category: ${latestProduct.mostPopularCategory}
    - Product Stock Status: ${latestProduct.stockStatus}
    
    Provide insights on popular products, stock management, and recommendations for boosting product sales.
  `;
  return prompt;
}

// Function to generate a prompt for AI based on wishlist analytics
export async function buildWishlistPrompt() {
  const wishlistData: WishlistAnalytics[] = await getWishlistAnalytics();

  const latestWishlist = wishlistData[0]; // Get the most recent data
  const prompt = `
    Based on the latest wishlist data from ${latestWishlist.date}, summarize wishlist trends:
    - Total Wishlists Created: ${latestWishlist.totalWishlists}
    - Most Added Product: ${latestWishlist.mostAddedProduct}
    - Wishlist Abandonment Rate: ${latestWishlist.abandonmentRate}%
    
    Provide insights on wishlist engagement, and suggest strategies to convert wishlist items into purchases.
  `;
  return prompt;
}

// Main function to generate the appropriate prompt based on the analytics type
export async function buildPrompt(analyticsType: string) {
  switch (analyticsType) {
    case "sales":
      return buildSalesPrompt();
    case "returns":
      return buildReturnsPrompt();
    case "customers":
      return buildCustomerPrompt();
    case "revenue":
      return buildRevenuePrompt();
    case "cart":
      return buildCartPrompt();
    case "checkout":
      return buildCheckoutPrompt();
    case "product":
      return buildProductPrompt();
    case "wishlist":
      return buildWishlistPrompt();
    default:
      throw new Error(`Unknown analytics type: ${analyticsType}`);
  }
}
