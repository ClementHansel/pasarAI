// prisma/seedtest.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample categories
  const categoryFashion = await prisma.category.create({
    data: { name: "Fashion" },
  });

  const categoryElectronics = await prisma.category.create({
    data: { name: "Electronics" },
  });

  const categoryHomeLiving = await prisma.category.create({
    data: { name: "Home & Living" },
  });

  // Create sample sellers
  const sellerTechStore = await prisma.account.create({
    data: {
      name: "Tech Store",
      email: "techstore@example.com",
      role: "SELLER",
      phone: "+1234567890",
      address: "123 Tech Street",
      country: "USA",
      province: "California",
      city: "San Francisco",
      profileImage: "https://picsum.photos/200/300",
    },
  });

  const sellerFashionHub = await prisma.account.create({
    data: {
      name: "Fashion Hub",
      email: "fashionhub@example.com",
      role: "SELLER",
      phone: "+19876543210",
      address: "456 Fashion Ave",
      country: "USA",
      province: "New York",
      city: "New York City",
      profileImage: "https://picsum.photos/200/301",
    },
  });

  // Create sample markets
  const marketDomestic = await prisma.market.create({
    data: {
      name: "Domestic Market",
      location: "Local Market",
      marketType: "LOCAL",
      revenue: 0,
      productCount: 0,
    },
  });

  const marketGlobal = await prisma.market.create({
    data: {
      name: "Global Market",
      location: "International Market",
      marketType: "GLOBAL",
      revenue: 0,
      productCount: 0,
    },
  });

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      name: "Wireless Headphones",
      description: "Premium noise-canceling wireless headphones",
      price: 89.99,
      originalPrice: 99.99,
      image: "https://picsum.photos/seed/headphones/200/300",
      stock: 50,
      soldCount: 15,
      unit: "pcs",
      isActive: true,
      accountId: sellerTechStore.id,
      marketId: marketDomestic.id,
      ecoCertifications: "RoHS, Energy Star",
      origin: "China",
      sku: "HP-001",
      isNewArrival: true,
      isBestSeller: false,
      isOnSale: true,
      isFeatured: true,
      duration: 720, // 30 days
      categories: {
        connect: [{ id: categoryElectronics.id }],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Organic Cotton T-Shirt",
      description: "100% organic cotton t-shirt in multiple sizes",
      price: 24.99,
      image: "https://picsum.photos/seed/tshirt/200/300",
      stock: 100,
      soldCount: 30,
      unit: "pcs",
      isActive: true,
      accountId: sellerFashionHub.id,
      marketId: marketDomestic.id,
      ecoCertifications: "GOTS, Fair Trade",
      origin: "India",
      sku: "TS-001",
      isNewArrival: false,
      isBestSeller: true,
      isOnSale: false,
      isFeatured: false,
      categories: {
        connect: [{ id: categoryFashion.id }],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Smartwatch Fitness Tracker",
      description: "Bluetooth-enabled smartwatch with heart rate monitoring",
      price: 129.99,
      originalPrice: 149.99,
      image: "https://picsum.photos/seed/smartwatch/200/300",
      stock: 30,
      soldCount: 10,
      unit: "pcs",
      isActive: true,
      accountId: sellerTechStore.id,
      marketId: marketDomestic.id,
      ecoCertifications: "IP67, Bluetooth",
      origin: "South Korea",
      sku: "SW-001",
      isNewArrival: false,
      isBestSeller: true,
      isOnSale: true,
      isFeatured: true,
      duration: 720,
      categories: {
        connect: [
          { id: categoryElectronics.id },
          { id: categoryHomeLiving.id },
        ],
      },
    },
  });

  console.log(
    "✅ Database seeded with 3 products, 8 categories, and 2 sellers"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
