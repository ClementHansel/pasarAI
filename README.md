# Sustainable Community Market Platform

## Overview

This platform is designed to foster sustainable community commerce by connecting buyers and sellers in local and global markets. It offers features such as authentication, market discovery, transactions, promotions, referrals, wishlists, and checkout/payment flows.

## Features Status

| Feature                        | Status           | Description                                                                                |
| ------------------------------ | ---------------- | ------------------------------------------------------------------------------------------ |
| Authentication & Authorization | In Progress      | Role-based signup, session & login flows implemented. Middleware and route guards pending. |
| Market Discovery & Details     | Done (Minor Fix) | Landing page and product filters functional. Minor CSS/UX tweaks needed.                   |
| Transactions & Promotions      | Needs Review     | Cart and voucher types defined. UI and logic need full integration.                        |
| Unique: Local/Global Toggle    | Done             | Currency switch and advanced filters fully functional.                                     |
| Referral System (Optional)     | In Progress      | Referral code generation and lookup implemented. UI integration pending.                   |
| Wishlist (Optional)            | In Progress      | UI components available. Service and API endpoints under development.                      |
| Checkout & Payment Flow        | UI Done          | Page layout and form UI complete. Payment gateway integration and validation pending.      |
| Demo & Polish                  | Planned          | Seed data, SEO meta tags, confirmation dialogs, and responsive design to be finalized.     |

## Getting Started

### Prerequisites

- Node.js (version X.X.X or higher)
- npm or yarn
- Database setup (see Prisma schema and migrations)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables as per `.env.example`.
4. Run database migrations:
   ```
   npx prisma migrate deploy
   ```
5. Seed the database (optional):
   ```
   npx prisma db seed
   ```
6. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `src/app/` - Main application pages and layouts.
- `src/components/` - Reusable React components.
- `src/services/` - Business logic and API service layers.
- `src/lib/` - Utility functions, hooks, and context providers.
- `src/types/` - TypeScript type definitions.
- `prisma/` - Database schema and migration files.
- `public/` - Static assets and images.

## Development Notes

- Authentication uses role-based access control; middleware guards are in progress.
- Market discovery includes product filtering and local/global toggling.
- Transactions and promotions require further integration for end-to-end flow.
- Referral system backend logic is implemented; UI integration is pending.
- Wishlist UI components exist; backend services are under construction.
- Checkout UI is complete; payment gateway integration is pending.
- Demo and polish tasks include adding seed data, SEO improvements, and responsive design.

## Contributing

Please follow the standard Git workflow:

- Fork the repository
- Create a feature branch
- Commit your changes with clear messages
- Open a pull request for review
