import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // Create Accounts
  const farmer = await prisma.account.create({
    data: {
      name: "Farmer Joe",
      email: "farmer@farm.com",
      role: "SELLER",
    },
  });

  const buyer = await prisma.account.create({
    data: {
      name: "Buyer Bob",
      email: "buyer@market.com",
      role: "BUYER",
    },
  });

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

  // Create Currencies
  const idr = await prisma.currency.create({
    data: {
      name: "Indonesian Rupiah",
      code: "IDR",
      accountId: farmer.id,
    },
  });

  const usd = await prisma.currency.create({
    data: {
      name: "United States Dollar",
      code: "USD",
      accountId: buyer.id,
    },
  });

  // Create Region/SubRegion/City
  const region = await prisma.region.create({
    data: { name: "Asia", description: "Asia Region" },
  });

  const subRegion = await prisma.subRegion.create({
    data: {
      name: "Southeast Asia",
      description: "SEA countries",
      regionId: region.id,
    },
  });

  const city = await prisma.city.create({
    data: {
      name: "Jakarta",
      description: "Capital of Indonesia",
      subRegionId: subRegion.id,
    },
  });

  // Create Market
  const domesticMarket = await prisma.market.create({
    data: {
      name: "Domestic Market",
      description: "Indonesian market",
      currencyId: idr.id,
      location: "Indonesia",
      regionId: region.id,
      subRegionId: subRegion.id,
      cityId: city.id,
    },
  });

  const marketGlobal = await prisma.market.create({
    data: {
      name: "Global Market",
      description: "International market",
      currencyId: usd.id,
      location: "International Market",
      marketType: "GLOBAL",
      revenue: 0,
      productCount: 0,
    },
  });

  // Create Wallets
  const farmerWallet = await prisma.wallet.create({
    data: {
      accountId: farmer.id,
      balance: 5000,
      currency: "IDR",
    },
  });

  const buyerWallet = await prisma.wallet.create({
    data: {
      accountId: buyer.id,
      balance: 10000,
      currency: "USD",
    },
  });

  // Wallet Transaction Logs
  await prisma.walletTransactionLog.createMany({
    data: [
      {
        walletId: farmerWallet.id,
        action: "INITIAL",
        oldValue: { balance: 0 },
        newValue: { balance: 5000 },
      },
      {
        walletId: buyerWallet.id,
        action: "TOPUP",
        oldValue: { balance: 0 },
        newValue: { balance: 10000 },
      },
    ],
  });

  // Create Categories
  const [
    categoryVegetables,
    categorySeafood,
    categoryMeat,
    categorySpices,
    categoryElectronics,
    categoryFashion,
    categoryHomeLiving,
  ] = await Promise.all(
    [
      "Vegetables",
      "Seafood",
      "Meat",
      "Spices",
      "Electronics",
      "Fashion",
      "HomeLiving",
    ].map(async (name) => prisma.category.create({ data: { name } }))
  );

  // Create Products
  const product = await prisma.product.create({
    data: {
      name: "Fresh Shrimp",
      description: "Wild-caught Indonesian shrimp",
      price: 120,
      stock: 500,
      categoryId: categorySeafood.id,
      accountId: farmer.id,
      marketId: domesticMarket.id,
    },
  });

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
      marketId: domesticMarket.id,
      ecoCertifications: "RoHS, Energy Star",
      origin: "China",
      sku: "HP-001",
      isNewArrival: true,
      isBestSeller: false,
      isOnSale: true,
      isFeatured: true,
      duration: 720,
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
      marketId: domesticMarket.id,
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
      marketId: domesticMarket.id,
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

  // Create Order
  const order = await prisma.order.create({
    data: {
      buyerId: buyer.id,
      sellerId: farmer.id,
      productId: product.id,
      quantity: 10,
      totalPrice: 1200,
      status: "PENDING",
    },
  });

  // Create Transaction
  await prisma.transaction.create({
    data: {
      accountId: buyer.id,
      walletId: buyerWallet.id,
      type: "TOPUP",
      amount: 1200,
      method: "Wallet",
      orderId: order.id,
      status: "SUCCESS",
      description: "Order payment for shrimp",
    },
  });

  console.log("✅ Seeding complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
