import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { Prisma } from "@prisma/client";

// GET only products for a specific seller (inventory)
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const accountId = searchParams.get("accountId"); // required
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
    }

    const filters: Prisma.ProductWhereInput = {
      accountId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      db.product.findMany({
        where: filters,
        skip,
        take: limit,
        include: {
          categories: true,
          reviews: true,
          tags: true,
          labels: true,
          market: true,
        },
      }),
      db.product.count({ where: filters }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("[INVENTORY_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const { accountId, role, marketId, name, price, stock } = body;
    if (!accountId || !role || !marketId || !name || !price || !stock) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Try to find the market by name (e.g., "domestic")
    const market = await db.market.findUnique({
      where: { name: marketId }, // if marketId is a name like "domestic"
    });

    if (!market) {
      return NextResponse.json({ error: "Market not found" }, { status: 404 });
    }

    // Convert price and stock to appropriate types
    const priceFloat = parseFloat(price); // Convert price to float
    const stockInt = parseInt(stock, 10); // Convert stock to integer

    // Check if price and stock are valid
    if (isNaN(priceFloat) || isNaN(stockInt)) {
      return NextResponse.json(
        { error: "Invalid price or stock values" },
        { status: 400 }
      );
    }

    // Create the product with the provided data and associated sellerId
    const createdProduct = await db.product.create({
      data: {
        name,
        price: priceFloat, // Use the converted price
        stock: stockInt, // Use the converted stock
        account: { connect: { id: accountId } },
        market: { connect: { id: marketId } },
      },
    });

    return NextResponse.json(
      { success: true, product: createdProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /inventory]", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { accountId, role } = await req.json(); // Get accountId and role passed from frontend

  if (!accountId || !role) {
    return NextResponse.json({ error: "Missing user info" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing product ID" },
        { status: 400 }
      );
    }

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    // Check if the product exists and ensure it's allowed for the current role
    if (
      !existingProduct ||
      (role === "seller" && existingProduct.accountId !== accountId)
    ) {
      return NextResponse.json(
        { error: "Forbidden or not found" },
        { status: 403 }
      );
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200 }
    );
  } catch (err) {
    console.error("[PUT /inventory]", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { accountId, role } = await req.json(); // Get accountId and role passed from frontend

  if (!accountId || !role) {
    return NextResponse.json({ error: "Missing user info" }, { status: 400 });
  }

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing product ID" },
        { status: 400 }
      );
    }

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    // Check if the product exists and ensure it's allowed for the current role
    if (
      !existingProduct ||
      (role === "seller" && existingProduct.accountId !== accountId)
    ) {
      return NextResponse.json(
        { error: "Forbidden or not found" },
        { status: 403 }
      );
    }

    await db.product.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[DELETE /inventory]", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
