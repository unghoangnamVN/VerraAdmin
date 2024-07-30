import { db } from "@/lib/db";
import { sendOrderEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { name, phone, email, address, items, price } = await req.json();

    const orderItems = items.map((item: any) => ({
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
    }));

    const order = await db.order.create({
      data: {
        storeId: params.storeId,
        customerName: name,
        phone,
        email,
        address,
        orderItems,
        price,
        status: "PENDING",
      },
    });

    await sendOrderEmail(order.id, name, email, phone, address, items);

    return NextResponse.json({ success: "success" }, { headers: corsHeaders });
  } catch (error) {
    console.log("[CHECKOUT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
