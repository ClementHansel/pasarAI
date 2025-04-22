import { OrderStatus, PaymentStatus, PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function main() {
  console.log("🌱 Seeding started...");

  // 1. Users
  const [user1, user2] = await Promise.all([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: await hashPassword("password123"),
        role: Role.CONSUMER,
        phone: "0811111111",
        address: "123 Ocean Ave",
        profileImage: "https://example.com/john.jpg",
        isVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        password: await hashPassword("password456"),
        role: Role.CONSUMER,
        phone: "0822222222",
        address: "456 Bay St",
        profileImage: "https://example.com/jane.jpg",
        isVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
  ]);
  console.log("✅ Users created");

  // 2. Sellers
  const [seller1, seller2] = await Promise.all([
    prisma.seller.create({
      data: {
        name: "EcoFarm",
        email: "eco@farm.com",
        password: await hashPassword("eco123"),
        phone: "0833333333",
        address: "Green Valley",
        isVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.seller.create({
      data: {
        name: "NatureMarket",
        email: "nature@market.com",
        password: await hashPassword("nature123"),
        phone: "0844444444",
        address: "Nature Road",
        isVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
  ]);
  console.log("✅ Sellers created");

  // 3. Market
  const market = await prisma.market.create({
    data: {
      name: "Green Market",
      description: "Eco-friendly goods only",
      location: "Downtown",
      sellers: {
        connect: [{ id: seller1.id }, { id: seller2.id }],
      },
    },
  });
  console.log("✅ Market created");

  // 4. Categories & Tags
  const [catFruit, catVeg] = await Promise.all([
    prisma.category.create({ data: { name: "Fruits" } }),
    prisma.category.create({ data: { name: "Vegetables" } }),
  ]);

  const [tagOrganic, tagFresh] = await Promise.all([
    prisma.tag.create({ data: { name: "Organic" } }),
    prisma.tag.create({ data: { name: "Fresh" } }),
  ]);
  console.log("✅ Categories and Tags created");

  // 5. Products
  const product1 = await prisma.product.create({
    data: {
      name: "Organic Apple",
      description: "Fresh organic apples",
      price: 2.99,
      originalPrice: 3.49,
      stock: 100,
      soldCount: 10,
      unit: "kg",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagOrganic.id }, { id: tagFresh.id }] },
      sku: "APL-001",
      ecoCertifications: "USDA Organic",
      origin: "Bandung",
      image: "https://example.com/apple.jpg",
      isBestSeller: true,
      isOnSale: true,
      isFeatured: true,
      labels: {
        connectOrCreate: [
          {
            where: { name: "Best Sellers" },
            create: { name: "Best Sellers" },
          },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Carrot",
      description: "Crunchy carrots",
      price: 15000,
      originalPrice: 18000,
      stock: 50,
      soldCount: 5,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller2.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }] },
      sku: "CRT-002",
      origin: "Bogor",
      image: "https://example.com/carrot.jpg",
      isBestSeller: false,
      isOnSale: true,
      isFeatured: false,
      labels: {
        connectOrCreate: [
          {
            where: { name: "New Arrivals" },
            create: { name: "New Arrivals" },
          },
        ],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Tomato",
      description: "Fresh juicy tomatoes",
      price: 1.49,
      originalPrice: 1.99,
      stock: 80,
      soldCount: 20,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }] },
      sku: "TOM-003",
      origin: "Bandung",
      image: "https://example.com/tomato.jpg",
      isBestSeller: false,
      isOnSale: true,
      isFeatured: true,
      labels: {
        connectOrCreate: [
          {
            where: { name: "On Sale" },
            create: { name: "On Sale" },
          },
        ],
      },
    },
  });

  console.log("✅ Products created");

  // 6. Voucher
  const voucher = await prisma.voucher.create({
    data: {
      code: "WELCOME10",
      discount: 10,
    },
  });
  console.log("✅ Voucher created");

  // 7. Orders & Order Items
  const order = await prisma.order.create({
    data: {
      buyerId: user1.id,
      status: OrderStatus.COMPLETED,
      paymentStatus: PaymentStatus.COMPLETED,
      shippingAddress: "123 Ocean Ave",
      notes: "Please pack with care",
      totalPrice: 6.49,
      discountApplied: 1.0,
      voucherId: voucher.id,
      shippedAt: new Date(),
      orderItems: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
          },
          {
            productId: product2.id,
            quantity: 2,
          },
          {
            productId: product3.id,
            quantity: 1,
          },
        ],
      },
    },
  });
  console.log("✅ Order and OrderItems created");

  // 8. Transaction
  await prisma.transaction.create({
    data: {
      orderId: order.id,
      amount: 6.49,
      paymentDate: new Date(),
      status: PaymentStatus.COMPLETED,
    },
  });
  console.log("✅ Transaction created");

  // 9. Reviews
  await prisma.review.createMany({
    data: [
      {
        productId: product1.id,
        userId: user1.id,
        rating: 5,
        comment: "Amazing apples!",
      },
      {
        productId: product2.id,
        userId: user2.id,
        rating: 4,
        comment: "Very fresh and tasty",
      },
      {
        productId: product3.id,
        userId: user2.id,
        rating: 2,
        comment: "Very cheap but not fresh",
      },
    ],
  });
  console.log("✅ Reviews created");

  // 10. Event Logs
  await prisma.eventLog.createMany({
    data: [
      {
        event: "User login",
        userId: user1.id,
        action: "login",
      },
      {
        event: "Order placed",
        orderId: order.id,
        userId: user1.id,
        action: "create_order",
      },
      {
        event: "Product updated",
        productId: product1.id,
        sellerId: seller1.id,
        action: "update_product",
      },
    ],
  });
  console.log("✅ Event Logs created");

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
