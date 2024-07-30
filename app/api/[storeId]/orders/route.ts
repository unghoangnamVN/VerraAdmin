import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUserId();
    const body = await req.json();

    const { ids, status } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
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

    const orders = await db.order.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[ORDERS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
