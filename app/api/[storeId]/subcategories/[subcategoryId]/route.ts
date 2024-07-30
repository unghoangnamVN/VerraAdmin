import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { subcategoryId: string } }
) {
  try {
    if (!params.subcategoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const subcategory = await db.subcategory.findUnique({
      where: {
        id: params.subcategoryId,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; subcategoryId: string } }
) {
  try {
    const userId = await currentUserId();
    const body = await req.json();

    const { name, description, categoryId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const subcategory = await db.subcategory.updateMany({
      where: {
        id: params.subcategoryId,
      },
      data: {
        name,
        description,
        categoryId,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; subcategoryId: string } }
) {
  try {
    const userId = await currentUserId();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.subcategoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const subcategory = await db.subcategory.deleteMany({
      where: {
        id: params.subcategoryId,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
