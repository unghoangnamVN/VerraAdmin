import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUserId();
    const body = await req.json();

    const {
      name,
      description,
      usdPrice,
      vndPrice,
      subcategoryId,
      image,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!usdPrice) {
      return new NextResponse("USD price is required", { status: 400 });
    }

    if (!vndPrice) {
      return new NextResponse("VND price is required", { status: 400 });
    }

    if (!image) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!subcategoryId) {
      return new NextResponse("Subcategory id required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        employees: {
          has: userId,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const lastProduct = await db.product.findFirst({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastProduct ? lastProduct.position + 1 : 1;

    const product = await db.product.create({
      data: {
        name,
        description,
        usdPrice,
        vndPrice,
        isFeatured,
        isArchived,
        subcategoryId,
        storeId: params.storeId,
        image,
        position: newPosition,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const subcategoryId = searchParams.get("subcategoryId") || undefined;

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: params.storeId,
        subcategoryId,
        isArchived: false,
      },
      include: {
        subcategory: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
