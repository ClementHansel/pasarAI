// src/lib/data/profile.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  joinDate: string;
  orderHistory: Order[];
  wishlist: WishlistItem[];
  wallet: {
    balance: number;
    transactions: Transaction[];
  };
}

export interface SellerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  joinDate: string;
  businessInfo: {
    storeName: string;
    description: string;
    category: string;
    rating: number;
    totalSales: number;
    revenue: number;
  };
  products: Product[];
  analytics: {
    monthlyRevenue: number[];
    monthlySales: number[];
    topProducts: Product[];
  };
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
  total: number;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
}

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  description: string;
}

// Mock data with improved images and content
export const mockUserProfile: UserProfile = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, Apt 4B, New York, NY 10001",
  avatar:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4",
  joinDate: "2023-05-15",
  orderHistory: [
    {
      id: "o1",
      date: "2024-03-15",
      status: "completed",
      total: 129.99,
      items: [
        {
          id: "i1",
          name: "Wireless Headphones",
          quantity: 1,
          price: 129.99,
          image: "/api/placeholder/100/100",
        },
      ],
    },
    {
      id: "o2",
      date: "2024-02-20",
      status: "completed",
      total: 85.75,
      items: [
        {
          id: "i2",
          name: "Fitness Tracker",
          quantity: 1,
          price: 85.75,
          image: "/api/placeholder/100/100",
        },
      ],
    },
    {
      id: "o3",
      date: "2024-04-05",
      status: "pending",
      total: 199.0,
      items: [
        {
          id: "i3",
          name: "Smart Speaker",
          quantity: 1,
          price: 199.0,
          image: "/api/placeholder/100/100",
        },
      ],
    },
  ],
  wishlist: [
    {
      id: "w1",
      name: "Ultra HD Monitor",
      price: 349.99,
      image: "/api/placeholder/200/200",
    },
    {
      id: "w2",
      name: "Ergonomic Office Chair",
      price: 249.99,
      image: "/api/placeholder/200/200",
    },
    {
      id: "w3",
      name: "Mechanical Keyboard",
      price: 129.99,
      image: "/api/placeholder/200/200",
    },
  ],
  wallet: {
    balance: 450.0,
    transactions: [
      {
        id: "t1",
        type: "credit",
        amount: 100.0,
        date: "2024-03-10",
        description: "Wallet top-up",
      },
      {
        id: "t2",
        type: "debit",
        amount: 50.0,
        date: "2024-03-15",
        description: "Purchase - Coffee Shop",
      },
      {
        id: "t3",
        type: "credit",
        amount: 400.0,
        date: "2024-03-20",
        description: "Refund - Order #o4",
      },
    ],
  },
};

export const mockSellerProfile: SellerProfile = {
  id: "s1",
  name: "Sarah Johnson",
  email: "sarah@freshmarket.com",
  phone: "+1 (555) 987-6543",
  address: "456 Business Avenue, Suite 200, San Francisco, CA 94107",
  avatar:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=d1ffd3",
  joinDate: "2022-11-01",
  businessInfo: {
    storeName: "Fresh Market Organics",
    description:
      "Premium organic produce and sustainable goods sourced from local farms and eco-friendly suppliers. We believe in providing high-quality, chemical-free products that support healthy living and environmental preservation.",
    category: "Organic Groceries",
    rating: 4.8,
    totalSales: 1850,
    revenue: 92500.0,
  },
  products: [
    {
      id: "p1",
      name: "Organic Apple Basket",
      price: 12.99,
      stock: 45,
      sold: 155,
      image: "/api/placeholder/300/300",
    },
    {
      id: "p2",
      name: "Farm Fresh Eggs (12-pack)",
      price: 7.99,
      stock: 25,
      sold: 210,
      image: "/api/placeholder/300/300",
    },
    {
      id: "p3",
      name: "Artisanal Sourdough Bread",
      price: 8.49,
      stock: 18,
      sold: 95,
      image: "/api/placeholder/300/300",
    },
    {
      id: "p4",
      name: "Organic Honey (16oz)",
      price: 14.99,
      stock: 30,
      sold: 87,
      image: "/api/placeholder/300/300",
    },
  ],
  analytics: {
    monthlyRevenue: [12500, 14000, 15500, 18000, 16500, 19000],
    monthlySales: [250, 280, 310, 360, 330, 380],
    topProducts: [
      {
        id: "p2",
        name: "Farm Fresh Eggs (12-pack)",
        price: 7.99,
        stock: 25,
        sold: 210,
        image: "/api/placeholder/300/300",
      },
      {
        id: "p1",
        name: "Organic Apple Basket",
        price: 12.99,
        stock: 45,
        sold: 155,
        image: "/api/placeholder/300/300",
      },
      {
        id: "p3",
        name: "Artisanal Sourdough Bread",
        price: 8.49,
        stock: 18,
        sold: 95,
        image: "/api/placeholder/300/300",
      },
    ],
  },
};
