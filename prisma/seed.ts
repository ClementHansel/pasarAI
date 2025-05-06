import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Create Domestic and Global Market Categories
    const domesticMarket = await prisma.market.create({
      data: {
        name: "Domestic Market",
        description: "Products available for the domestic market.",
      },
    });

    const globalMarket = await prisma.market.create({
      data: {
        name: "Global Market",
        description: "Products available for the global market.",
      },
    });

    // Create categories
    const farmingCategory = await prisma.category.create({
      data: {
        name: "Farming Products",
        description:
          "Products related to farming such as crops, vegetables, etc.",
      },
    });

    const animalsCategory = await prisma.category.create({
      data: {
        name: "Domesticated Animals",
        description: "Animals raised for food, companionship, or work.",
      },
    });

    const fisheriesCategory = await prisma.category.create({
      data: {
        name: "Fisheries",
        description: "Fish and aquatic life for food or commercial purposes.",
      },
    });

    const relatedCategory = await prisma.category.create({
      data: {
        name: "Related Products",
        description:
          "Products related to farming, animals, and fisheries like feed, fertilizers, etc.",
      },
    });

    // Add Products to categories
    const products = [
      // Farming Products
      {
        name: "Wheat",
        price: 100,
        unit: "kg",
        marketId: domesticMarket.id,
        categoryId: farmingCategory.id,
      },
      {
        name: "Corn",
        price: 80,
        unit: "kg",
        marketId: globalMarket.id,
        categoryId: farmingCategory.id,
      },
      {
        name: "Rice",
        price: 120,
        unit: "kg",
        marketId: globalMarket.id,
        categoryId: farmingCategory.id,
      },
      {
        name: "Tomatoes",
        price: 60,
        unit: "kg",
        marketId: domesticMarket.id,
        categoryId: farmingCategory.id,
      },

      // Domesticated Animals
      {
        name: "Cattle",
        price: 2000,
        unit: "head",
        marketId: globalMarket.id,
        categoryId: animalsCategory.id,
      },
      {
        name: "Chicken",
        price: 50,
        unit: "head",
        marketId: domesticMarket.id,
        categoryId: animalsCategory.id,
      },
      {
        name: "Sheep",
        price: 300,
        unit: "head",
        marketId: globalMarket.id,
        categoryId: animalsCategory.id,
      },
      {
        name: "Pigs",
        price: 150,
        unit: "head",
        marketId: domesticMarket.id,
        categoryId: animalsCategory.id,
      },

      // Fisheries
      {
        name: "Salmon",
        price: 15,
        unit: "kg",
        marketId: globalMarket.id,
        categoryId: fisheriesCategory.id,
      },
      {
        name: "Tuna",
        price: 18,
        unit: "kg",
        marketId: domesticMarket.id,
        categoryId: fisheriesCategory.id,
      },
      {
        name: "Trout",
        price: 20,
        unit: "kg",
        marketId: globalMarket.id,
        categoryId: fisheriesCategory.id,
      },
      {
        name: "Shrimp",
        price: 10,
        unit: "kg",
        marketId: domesticMarket.id,
        categoryId: fisheriesCategory.id,
      },

      // Related Products
      {
        name: "Fertilizer",
        price: 30,
        unit: "kg",
        marketId: globalMarket.id,
        categoryId: relatedCategory.id,
      },
      {
        name: "Animal Feed",
        price: 25,
        unit: "kg",
        marketId: domesticMarket.id,
        categoryId: relatedCategory.id,
      },
      {
        name: "Fish Food",
        price: 12,
        unit: "kg",
        marketId: globalMarket.id,
        categoryId: relatedCategory.id,
      },
      {
        name: "Pesticides",
        price: 40,
        unit: "litre",
        marketId: domesticMarket.id,
        categoryId: relatedCategory.id,
      },
    ];

    // Create products with connect
    await prisma.product.createMany({
      data: products,
    });

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
