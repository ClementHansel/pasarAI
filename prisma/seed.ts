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

  const brand = await prisma.brand.create({
    data: {
      name: "Green Market",
      description: "Eco-friendly goods only",
      sellers: {
        connect: [{ id: seller1.id }, { id: seller2.id }],
      },
    },
  });
  console.log("✅ Brand created");

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
      brandId: brand ? brand.id : undefined,
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
      tags: { connect: [{ id: tagOrganic.id }, { id: catVeg.id }] },
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
      tags: { connect: [{ id: tagOrganic.id }, { id: catVeg.id }] },
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

  const product4 = await prisma.product.create({
    data: {
      name: "Organic Banana",
      description: "Sweet and ripe organic bananas",
      price: 1.99,
      originalPrice: 2.49,
      stock: 120,
      soldCount: 15,
      unit: "kg",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "BAN-001",
      ecoCertifications: "Fair Trade",
      origin: "Lampung",
      image: "https://example.com/banana.jpg",
      isBestSeller: true,
      isOnSale: false,
      isFeatured: true,
      labels: {
        connectOrCreate: [
          {
            where: { name: "Top Rated" },
            create: { name: "Top Rated" },
          },
        ],
      },
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Fresh Mango",
      description: "Juicy and fragrant mangoes",
      price: 3.49,
      originalPrice: 3.99,
      stock: 80,
      soldCount: 20,
      unit: "kg",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "MNG-001",
      ecoCertifications: "Local Farm Certified",
      origin: "Cirebon",
      image: "https://example.com/mango.jpg",
      isBestSeller: false,
      isOnSale: true,
      isFeatured: true,
      labels: {
        connectOrCreate: [
          {
            where: { name: "Seasonal" },
            create: { name: "Seasonal" },
          },
        ],
      },
    },
  });

  const product6 = await prisma.product.create({
    data: {
      name: "Red Grapes",
      description: "Seedless red grapes",
      price: 4.99,
      originalPrice: 5.49,
      stock: 60,
      soldCount: 25,
      unit: "kg",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "GRP-001",
      ecoCertifications: "Eco Friendly",
      origin: "Bali",
      image: "https://example.com/grapes.jpg",
      isBestSeller: true,
      isOnSale: true,
      isFeatured: false,
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
  const product7 = await prisma.product.create({
    data: {
      name: "Watermelon",
      description: "Large and juicy watermelon",
      price: 5.99,
      originalPrice: 6.99,
      stock: 40,
      soldCount: 30,
      unit: "each",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "WTM-001",
      ecoCertifications: "Water Efficient Farming",
      origin: "Surabaya",
      image: "https://example.com/watermelon.jpg",
      isBestSeller: false,
      isOnSale: true,
      isFeatured: false,
      labels: {
        connectOrCreate: [
          {
            where: { name: "Featured" },
            create: { name: "Featured" },
          },
        ],
      },
    },
  });

  const product8 = await prisma.product.create({
    data: {
      name: "Pineapple",
      description: "Sweet tropical pineapples",
      price: 3.99,
      originalPrice: 4.59,
      stock: 70,
      soldCount: 18,
      unit: "each",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "PNP-001",
      ecoCertifications: "USDA Organic",
      origin: "Medan",
      image: "https://example.com/pineapple.jpg",
      isBestSeller: true,
      isOnSale: false,
      isFeatured: true,
      labels: {
        connectOrCreate: [
          {
            where: { name: "Top Rated" },
            create: { name: "Top Rated" },
          },
        ],
      },
    },
  });

  const product9 = await prisma.product.create({
    data: {
      name: "Strawberries",
      description: "Fresh and juicy strawberries",
      price: 6.49,
      originalPrice: 7.49,
      stock: 30,
      soldCount: 12,
      unit: "box",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "STB-001",
      ecoCertifications: "Rainforest Alliance",
      origin: "Lembang",
      image: "https://example.com/strawberries.jpg",
      isBestSeller: true,
      isOnSale: true,
      isFeatured: true,
      labels: {
        connectOrCreate: [
          {
            where: { name: "Limited Edition" },
            create: { name: "Limited Edition" },
          },
        ],
      },
    },
  });

  const product10 = await prisma.product.create({
    data: {
      name: "Papaya",
      description: "Tropical and healthy papaya",
      price: 2.49,
      originalPrice: 2.99,
      stock: 90,
      soldCount: 22,
      unit: "each",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "PAP-001",
      ecoCertifications: "Organic Indonesia",
      origin: "Bekasi",
      image: "https://example.com/papaya.jpg",
      isBestSeller: false,
      isOnSale: true,
      isFeatured: false,
      labels: {
        connectOrCreate: [
          {
            where: { name: "Healthy Choice" },
            create: { name: "Healthy Choice" },
          },
        ],
      },
    },
  });

  const product11 = await prisma.product.create({
    data: {
      name: "Kiwi",
      description: "Imported kiwi fruits",
      price: 5.49,
      originalPrice: 5.99,
      stock: 50,
      soldCount: 19,
      unit: "box",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "KIW-001",
      ecoCertifications: "Non-GMO",
      origin: "New Zealand",
      image: "https://example.com/kiwi.jpg",
      isBestSeller: false,
      isOnSale: false,
      isFeatured: true,
      labels: {
        connectOrCreate: [
          {
            where: { name: "Imported" },
            create: { name: "Imported" },
          },
        ],
      },
    },
  });

  const product12 = await prisma.product.create({
    data: {
      name: "Avocado",
      description: "Creamy organic avocados",
      price: 4.29,
      originalPrice: 4.99,
      stock: 65,
      soldCount: 28,
      unit: "kg",
      categoryId: catFruit.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "AVC-001",
      ecoCertifications: "USDA Organic",
      origin: "Bogor",
      image: "https://example.com/avocado.jpg",
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

  const product13 = await prisma.product.create({
    data: {
      name: "Zucchini",
      description: "Tender green zucchinis",
      price: 2.19,
      originalPrice: 2.69,
      stock: 50,
      soldCount: 8,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: catFruit.id }] },
      sku: "ZUC-010",
      origin: "Tasikmalaya",
      image: "https://example.com/zucchini.jpg",
      isBestSeller: false,
      isOnSale: false,
      isFeatured: true,
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

  const product14 = await prisma.product.create({
    data: {
      name: "Carrot",
      description: "Crunchy and sweet carrots",
      price: 1.29,
      originalPrice: 1.59,
      stock: 100,
      soldCount: 30,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagOrganic.id }, { id: tagFresh.id }] },
      sku: "CAR-001",
      origin: "Garut",
      image: "https://example.com/carrot.jpg",
      isBestSeller: true,
      isOnSale: true,
      isFeatured: false,
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

  const product15 = await prisma.product.create({
    data: {
      name: "Spinach",
      description: "Fresh green spinach leaves",
      price: 0.99,
      originalPrice: 1.29,
      stock: 70,
      soldCount: 15,
      unit: "bunch",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "SPI-002",
      origin: "Lembang",
      image: "https://example.com/spinach.jpg",
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
  const product16 = await prisma.product.create({
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
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "TOM-003",
      origin: "Bandung",
      image: "https://example.com/tomato.jpg",
      isBestSeller: false,
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

  const product17 = await prisma.product.create({
    data: {
      name: "Potato",
      description: "Fresh and starchy potatoes",
      price: 0.89,
      originalPrice: 1.19,
      stock: 120,
      soldCount: 40,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "POT-002",
      origin: "Cimahi",
      image: "https://example.com/potato.jpg",
      isBestSeller: true,
      isOnSale: false,
      isFeatured: false,
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
  const product18 = await prisma.product.create({
    data: {
      name: "Cucumber",
      description: "Crisp and refreshing cucumbers",
      price: 1.09,
      originalPrice: 1.49,
      stock: 90,
      soldCount: 18,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "CUC-004",
      origin: "Cianjur",
      image: "https://example.com/cucumber.jpg",
      isBestSeller: true,
      isOnSale: true,
      isFeatured: false,
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
  const product19 = await prisma.product.create({
    data: {
      name: "Broccoli",
      description: "Nutritious green broccoli",
      price: 2.49,
      originalPrice: 2.99,
      stock: 60,
      soldCount: 25,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "BRO-005",
      origin: "Ciwidey",
      image: "https://example.com/broccoli.jpg",
      isBestSeller: false,
      isOnSale: false,
      isFeatured: true,
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
  const product20 = await prisma.product.create({
    data: {
      name: "Cauliflower",
      description: "Fresh white cauliflower",
      price: 2.29,
      originalPrice: 2.89,
      stock: 55,
      soldCount: 17,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "CAU-006",
      origin: "Pangalengan",
      image: "https://example.com/cauliflower.jpg",
      isBestSeller: false,
      isOnSale: false,
      isFeatured: false,
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
  const product21 = await prisma.product.create({
    data: {
      name: "Bell Pepper",
      description: "Colorful bell peppers",
      price: 1.99,
      originalPrice: 2.49,
      stock: 85,
      soldCount: 22,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "BEL-007",
      origin: "Cimahi",
      image: "https://example.com/bellpepper.jpg",
      isBestSeller: true,
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
  const product22 = await prisma.product.create({
    data: {
      name: "Eggplant",
      description: "Glossy purple eggplants",
      price: 1.79,
      originalPrice: 2.19,
      stock: 65,
      soldCount: 12,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "EGG-007",
      origin: "Subang",
      image: "https://example.com/eggplant.jpg",
      isBestSeller: false,
      isOnSale: true,
      isFeatured: false,
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
  const product23 = await prisma.product.create({
    data: {
      name: "Chili Pepper",
      description: "Spicy red chili peppers",
      price: 3.99,
      originalPrice: 4.49,
      stock: 40,
      soldCount: 30,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "CHL-008",
      origin: "Majalengka",
      image: "https://example.com/chili.jpg",
      isBestSeller: true,
      isOnSale: false,
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
  const product24 = await prisma.product.create({
    data: {
      name: "Green Beans",
      description: "Fresh green beans",
      price: 1.89,
      originalPrice: 2.39,
      stock: 75,
      soldCount: 10,
      unit: "kg",
      categoryId: catVeg.id,
      sellerId: seller1.id,
      marketId: market.id,
      tags: { connect: [{ id: tagFresh.id }, { id: tagOrganic.id }] },
      sku: "GRB-009",
      origin: "Sumedang",
      image: "https://example.com/greenbeans.jpg",
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

  console.log("✅ Products created");

  // 6. Giftcard
  const giftcard = await prisma.giftcard.create({
    data: {
      code: "WELCOME10",
      discount: 10,
    },
  });
  console.log("✅ Giftcard created");

  // 7. Orders & Order Items
  const order = await prisma.order.create({
    data: {
      buyerId: user1.id,
      status: OrderStatus.COMPLETED,
      paymentStatus: PaymentStatus.COMPLETED,
      paymentMethod: "Wallet",
      shippingAddress: "123 Ocean Ave",
      notes: "Please pack with care",
      totalPrice: 6.49,
      discountApplied: 1.0,
      giftcardId: giftcard.id,
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
      {
        productId: product4.id,
        userId: user1.id,
        rating: 3,
        comment: "Good quality but expensive",
      },
      {
        productId: product5.id,
        userId: user2.id,
        rating: 5,
        comment: "Best mangoes ever!",
      },
      {
        productId: product6.id,
        userId: user1.id,
        rating: 4,
        comment: "Great grapes, will buy again",
      },
      {
        productId: product7.id,
        userId: user2.id,
        rating: 3,
        comment: "Watermelon was a bit overripe",
      },
      {
        productId: product8.id,
        userId: user1.id,
        rating: 5,
        comment: "Delicious pineapple!",
      },
      {
        productId: product9.id,
        userId: user2.id,
        rating: 4,
        comment: "Fresh strawberries, loved them",
      },
      {
        productId: product10.id,
        userId: user1.id,
        rating: 2,
        comment: "Papaya was not ripe enough",
      },
      {
        productId: product11.id,
        userId: user2.id,
        rating: 5,
        comment: "Kiwi was sweet and juicy",
      },
      {
        productId: product12.id,
        userId: user1.id,
        rating: 4,
        comment: "Avocado was creamy and fresh",
      },
      {
        productId: product13.id,
        userId: user2.id,
        rating: 3,
        comment: "Zucchini was okay, not the best",
      },
      {
        productId: product14.id,
        userId: user1.id,
        rating: 5,
        comment: "Carrot was crunchy and sweet",
      },
      {
        productId: product15.id,
        userId: user2.id,
        rating: 4,
        comment: "Spinach was fresh and green",
      },
      {
        productId: product16.id,
        userId: user1.id,
        rating: 2,
        comment: "Tomato was not fresh enough",
      },
      {
        productId: product17.id,
        userId: user2.id,
        rating: 5,
        comment: "Potato was starchy and delicious",
      },
      {
        productId: product18.id,
        userId: user1.id,
        rating: 4,
        comment: "Cucumber was crisp and refreshing",
      },
      {
        productId: product19.id,
        userId: user2.id,
        rating: 3,
        comment: "Broccoli was okay, not the best",
      },
      {
        productId: product20.id,
        userId: user1.id,
        rating: 5,
        comment: "Cauliflower was fresh and white",
      },
      {
        productId: product21.id,
        userId: user2.id,
        rating: 4,
        comment: "Bell pepper was colorful and sweet",
      },
      {
        productId: product22.id,
        userId: user1.id,
        rating: 2,
        comment: "Eggplant was not fresh enough",
      },
      {
        productId: product23.id,
        userId: user2.id,
        rating: 5,
        comment: "Chili pepper was spicy and fresh",
      },
      {
        productId: product24.id,
        userId: user1.id,
        rating: 4,
        comment: "Green beans were fresh and crunchy",
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
