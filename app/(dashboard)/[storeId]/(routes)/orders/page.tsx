import { format } from "date-fns";

import { OrderClient } from "./_components/client";
import { OrderColumn } from "./_components/column";
import { formatter } from "@/lib/utils";
import { db } from "@/lib/db";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    name: item.customerName,
    email: item.email,
    phone: item.phone,
    address: item.address,
    items: item.orderItems.map((orderItem) => orderItem.productName).join(", "),
    price: formatter("VND").format(item.price),
    status: item.status,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
