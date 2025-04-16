import { OrderStatus, PaymentStatus, PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function main() {
  console.log("🌱 Seeding started...");

  // Seed users
  const [user1, user2] = await Promise.all([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: await hashPassword("password123"),
        role: Role.CONSUMER,
        phone: "123456789",
        address: "123 Main St",
        profileImage: "https://example.com/profile.jpg",
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: await hashPassword("password456"),
        role: Role.CONSUMER,
        phone: "987654321",
        address: "456 Elm St",
        profileImage: "https://example.com/profile.jpg",
        isVerified: true,
      },
    }),
  ]);
  console.log("👤 Users created");

  // Seed sellers
  const [seller1, seller2] = await Promise.all([
    prisma.seller.create({
      data: {
        name: "TechWorld",
        email: "techworld@example.com",
        password: await hashPassword("techpass1"),
        role: Role.SELLER,
        phone: "1122334455",
        address: "789 Tech Rd",
        isVerified: true,
      },
    }),
    prisma.seller.create({
      data: {
        name: "GadgetStore",
        email: "gadgetstore@example.com",
        password: await hashPassword("gadgetpass2"),
        role: Role.SELLER,
        phone: "2233445566",
        address: "101 Gadget Blvd",
        isVerified: true,
      },
    }),
  ]);
  console.log("🧑‍💼 Sellers created");

  // Categories
  const [electronicsCategory, fashionCategory] = await Promise.all([
    prisma.category.create({ data: { name: "Electronics" } }),
    prisma.category.create({ data: { name: "Fashion" } }),
  ]);
  console.log("🗂️ Categories created");

  // Markets
  const [market1, market2] = await Promise.all([
    prisma.market.create({
      data: {
        name: "Tech Market",
        description: "A market for all tech products",
        sellers: { connect: [{ id: seller1.id }] },
      },
    }),
    prisma.market.create({
      data: {
        name: "Fashion Market",
        description: "A market for fashion products",
        sellers: { connect: [{ id: seller2.id }] },
      },
    }),
  ]);
  console.log("🏪 Markets created");

  // Products
  const [product1, product2, product3, product4] = await Promise.all([
    prisma.product.create({
      data: {
        name: "Laptop X",
        description: "A powerful laptop",
        price: 1200.0,
        stock: 50,
        categoryId: electronicsCategory.id,
        sellerId: seller1.id,
        marketId: market1.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Smartphone Y",
        description: "A feature-rich smartphone",
        price: 800.0,
        stock: 100,
        categoryId: electronicsCategory.id,
        sellerId: seller1.id,
        marketId: market1.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Dress A",
        description: "A stylish summer dress",
        price: 50.0,
        stock: 30,
        categoryId: fashionCategory.id,
        sellerId: seller2.id,
        marketId: market2.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Shirt B",
        description: "A comfortable cotton shirt",
        price: 25.0,
        stock: 40,
        categoryId: fashionCategory.id,
        sellerId: seller2.id,
        marketId: market2.id,
      },
    }),
  ]);
  console.log("📦 Products created");

  // Orders with items
  const [order1, order2] = await Promise.all([
    prisma.order.create({
      data: {
        buyerId: user1.id,
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        shippingAddress: "123 Main St, Cityville",
        totalPrice: 2000.0,
        orderItems: {
          create: [
            { productId: product1.id, quantity: 1 },
            { productId: product2.id, quantity: 1 },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        buyerId: user2.id,
        status: OrderStatus.COMPLETED,
        paymentStatus: PaymentStatus.COMPLETED,
        shippingAddress: "456 Elm St, Townville",
        totalPrice: 75.0,
        orderItems: {
          create: [{ productId: product3.id, quantity: 1 }],
        },
      },
    }),
  ]);
  console.log("🧾 Orders created");

  // Event Logs
  const [eventLog1, eventLog2] = await Promise.all([
    prisma.eventLog.create({
      data: {
        event: "User created an order",
        userId: user1.id,
        action: "ORDER_CREATED",
        createdAt: new Date(),
      },
    }),
    prisma.eventLog.create({
      data: {
        event: "Seller updated product details",
        sellerId: seller1.id,
        productId: product1.id,
        action: "PRODUCT_UPDATED",
        createdAt: new Date(),
      },
    }),
  ]);
  console.log("📑 Event logs created");

  // Link event logs
  if (eventLog1 && order1) {
    await prisma.order.update({
      where: { id: order1.id },
      data: {
        eventLogs: {
          connect: [{ id: eventLog1.id }],
        },
      },
    });
  }

  if (eventLog2 && product1) {
    await prisma.product.update({
      where: { id: product1.id },
      data: {
        eventLogs: {
          connect: [{ id: eventLog2.id }],
        },
      },
    });
  }

  console.log("🔗 Event logs linked");

  console.log("✅ Seed complete:");
  console.table({
    Users: [user1.email, user2.email],
    Sellers: [seller1.email, seller2.email],
    Products: [product1.name, product2.name, product3.name, product4.name],
    Orders: [order1.id, order2.id],
    EventLogs: [eventLog1.action, eventLog2.action],
  });
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
