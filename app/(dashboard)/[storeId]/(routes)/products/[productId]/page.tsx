import { db } from "@/lib/db";
import { ProductForm } from "./_components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  let product = null;

  if (params.productId === "new") {
  } else {
    product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        subcategory: true,
      },
    });
  }

  const subcategories = await db.subcategory.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm subcategories={subcategories} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
