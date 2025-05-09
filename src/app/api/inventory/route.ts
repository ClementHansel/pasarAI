import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { Prisma } from "@prisma/client";

const isAuthorized = async (accountId: string, role: string) => {
  if (!accountId || !role || !["admin", "seller"].includes(role)) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 403 }),
    };
  }
  return { session: { accountId, role }, error: null };
};

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
  const { accountId, role } = await req.json(); // Get accountId and role passed from frontend

  if (!accountId || !role) {
    return NextResponse.json({ error: "Missing user info" }, { status: 400 });
  }

  // Check if the session is authorized
  const { session, error } = await isAuthorized(accountId, role);
  if (error) return error;

  try {
    const body = await req.json();

    // Validate required fields
    const { name, price, stock, categoryId } = body;
    if (!name || !price || !stock || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the product with the provided data and associated sellerId
    const createdProduct = await db.product.create({
      data: {
        ...body,
        accountId: session.accountId,
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

  // Check if the session is authorized
  const { session, error } = await isAuthorized(accountId, role);
  if (error) return error;

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
      (session.role === "seller" &&
        existingProduct.accountId !== session.accountId)
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

  // Check if the session is authorized
  const { session, error } = await isAuthorized(accountId, role);
  if (error) return error;

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
      (session.role === "seller" &&
        existingProduct.accountId !== session.accountId)
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
