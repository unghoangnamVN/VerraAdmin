import { db } from "@/lib/db";

export const getTotalRevenue = async (storeId: string) => {
  const completedOrders = await db.order.findMany({
    where: {
      storeId,
      status: "COMPLETED",
    },
  });

  const totalRevenue = completedOrders.reduce(
    (total, order) => total + order.price,
    0
  );

  return totalRevenue;
};
