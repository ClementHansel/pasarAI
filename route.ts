import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { db } from "@/lib/db/db";
import { categorizeProduct } from "@/lib/db/productCategorization";
import { productSchema } from "@/lib/validation/productSchema";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

function isNewArrival(createdAt: Date): boolean {
  const oneDay = 24 * 60 * 60 * 1000;
  return Date.now() - createdAt.getTime() <= oneDay;
}

function formatTagsForCreateOrUpdate(tags?: string[]) {
  if (!tags || tags.length === 0) return undefined;
  return {
    connectOrCreate: tags.map((tagName) => ({
      where: { name: tagName },
      create: { name: tagName },
    })),
  };
}

const JWT_SECRET = process.env.NEXTAUTH_SECRET!;

// GET: Fetch all products with filters, pagination, and sorting
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // --- Token Verification ---
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    let accountId: string, role: string;

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        accountId: string;
        role: string;
      };
      accountId = decoded.accountId;
      role = decoded.role;
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // --- Extract Query Parameters ---
    const marketType = searchParams.get("marketType");
    const city = searchParams.get("city");
    const province = searchParams.get("province");
    const country = searchParams.get("country");
    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sortByPrice = searchParams.get("sortByPrice");
    const sortByTags = searchParams.get("sortByTags");
    const search = searchParams.get("search");

    // --- Validate Input ---
    const validMarketTypes = ["domestic", "global"];
    if (marketType && !validMarketTypes.includes(marketType)) {
      return NextResponse.json(
        {
          error: `Invalid marketType. Valid values: ${validMarketTypes.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // --- Build Filters ---
    const filters: Prisma.ProductWhereInput = {
      ...(marketType && {
        market: {
          marketType,
        },
      }),
      ...(categoryId && {
        categories: {
          some: {
            id: categoryId,
          },
        },
      }),
      ...(city || province || country
        ? {
            account: {
              is: {
                ...(city ? { city } : {}),
                ...(province ? { province } : {}),
                ...(country ? { country } : {}),
              },
            },
          }
        : {}),
      ...(role === "SELLER" && {
        accountId, // Enforce account ownership for sellers
      }),
    };

    if (search) {
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { some: { name: { contains: search, mode: "insensitive" } } } },
      ];
    }

    // --- Build Sorting ---
    const orderBy: Prisma.ProductOrderByWithRelationInput[] = [];
    if (sortByPrice === "priceLow") orderBy.push({ price: "asc" });
    if (sortByPrice === "priceHigh") orderBy.push({ price: "desc" });

    if (sortByTags === "onSale") orderBy.push({ isOnSale: "desc" });
    if (sortByTags === "bestSeller") orderBy.push({ isBestSeller: "desc" });
    if (sortByTags === "newArrival") orderBy.push({ createdAt: "desc" });

    // --- Pagination ---
    const skip = (page - 1) * limit;

    // --- Fetch Products ---
    const [products, totalProducts] = await Promise.all([
      db.product.findMany({
        where: filters,
        orderBy: orderBy.length > 0 ? orderBy : undefined,
        skip,
        take: limit,
        include: {
          categories: true,
          account: true,
          reviews: true,
          tags: true,
          labels: true,
          market: true,
        },
      }),
      db.product.count({
        where: filters,
      }),
    ]);

    // --- Format Response ---
    const productsWithImageUrls = products.map((p) => ({
      ...p,
      imageUrls: p.image ? [p.image] : [],
    }));

    return NextResponse.json({
      products: productsWithImageUrls,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Create product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors
        .map((e) => e.message)
        .join(", ");
      return NextResponse.json(
        { error: `Validation failed: ${errorMessages}` },
        { status: 400 }
      );
    }

    const {
      name,
      description,
      price,
      image,
      stock,
      soldCount,
      unit,
      tags,
      categoryId,
      ecoCertifications,
      origin,
      sku,
      isActive,
      accountId,
      marketId,
      label,
      createdAt,
      discount,
      featured,
    } = parsed.data;

    const transaction = await prisma.$transaction(async (prisma) => {
      // Check for existing SKU
      if (sku) {
        const existing = await prisma.product.findFirst({ where: { sku } });
        if (existing) {
          throw new Error("Product with this SKU already exists");
        }
      }

      // Ensure category exists or create it
      let finalCategoryId = categoryId;
      if (!finalCategoryId) {
        const uncategorized = await prisma.category.findFirst({
          where: { name: "Uncategorized" },
        });
        if (uncategorized) {
          finalCategoryId = uncategorized.id;
        } else {
          const created = await prisma.category.create({
            data: { name: "Uncategorized" },
          });
          finalCategoryId = created.id;
        }
      }

      // Conditionally upsert the manual label (if provided)
      let manualLabel = null;
      if (label) {
        manualLabel = await prisma.label.upsert({
          where: { name: label },
          update: {},
          create: { name: label },
        });
      }

      // Generate auto-labels
      const autoLabels: string[] = [];
      if (createdAt && isNewArrival(new Date(createdAt))) {
        autoLabels.push("New Arrival");
      }
      if (discount && discount > 0) {
        autoLabels.push("On Sale");
      }
      if (featured) {
        autoLabels.push("Featured");
      }

      // Upsert auto-labels
      const autoLabelConnections = await Promise.all(
        autoLabels.map(async (labelName) => {
          return prisma.label.upsert({
            where: { name: labelName },
            update: {},
            create: { name: labelName },
          });
        })
      );

      // Combine all label connections
      const allLabelConnections = [
        ...autoLabelConnections.map((l) => ({ id: l.id })),
      ];
      if (manualLabel) {
        allLabelConnections.push({ id: manualLabel.id });
      }

      // Create product
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          price,
          image,
          stock,
          soldCount,
          unit,
          ecoCertifications,
          origin,
          sku,
          isActive,
          accountId,
          marketId,
          tags: formatTagsForCreateOrUpdate(tags),
          labels: {
            connect: allLabelConnections,
          },
          categories: {
            connect: [{ id: finalCategoryId }],
          },
        },
        include: {
          tags: true,
          labels: true,
          categories: true,
        },
      });

      return newProduct;
    });

    return NextResponse.json(
      { message: "Product created", product: transaction },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("POST error:", error.message);
      return NextResponse.json(
        { error: error.message || "Failed to create product" },
        { status: 500 }
      );
    } else {
      console.error("POST error:", error);
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 }
      );
    }
  }
}

// PUT: Update product
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      description,
      price,
      image,
      stock,
      soldCount,
      unit,
      tags,
      categoryId,
      ecoCertifications,
      origin,
      sku,
      isActive,
      accountId,
      categoryLabel,
    } = body;

    if (!id || !name || !price || !sku || !accountId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const transaction = await prisma.$transaction(async (prisma) => {
      // Update category label if both categoryId and categoryLabel are provided
      if (categoryId && categoryLabel) {
        await prisma.category.update({
          where: { id: categoryId },
          data: { label: categoryLabel },
        });
      }

      // Determine the final categoryId to set
      let finalCategoryId = categoryId;
      if (!finalCategoryId) {
        const newCat = await categorizeProduct(
          name + " " + (description || "")
        );
        finalCategoryId = newCat || existing.categories?.[0]?.id;
      }

      const updated = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          image,
          stock,
          soldCount,
          unit,
          ecoCertifications,
          origin,
          sku,
          isActive,
          accountId,
          tags: {
            set: [],
            ...formatTagsForCreateOrUpdate(tags),
          },
          ...(finalCategoryId && {
            categories: {
              set: [{ id: finalCategoryId }],
            },
          }),
        },
        include: {
          tags: true,
          categories: true,
        },
      });

      return updated;
    });

    return NextResponse.json({
      message: "Product updated successfully",
      product: transaction,
    });
  } catch (error: unknown) {
    console.error("PUT error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update product",
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("DELETE error:", error.message);
      return NextResponse.json(
        { error: error.message || "Failed to delete product" },
        { status: 500 }
      );
    } else {
      console.error("DELETE error:", error);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }
  }
}
