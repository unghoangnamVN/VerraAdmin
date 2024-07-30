import { db } from "@/lib/db";
import { SubcategoryForm } from "./_components/subcategory-form";

const CategoryPage = async ({
  params,
}: {
  params: { subcategoryId: string; storeId: string };
}) => {
  let subcategory = null;

  if (params.subcategoryId === "new") {
  } else {
    subcategory = await db.subcategory.findUnique({
      where: {
        id: params.subcategoryId,
      },
    });
  }

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubcategoryForm categories={categories} initialData={subcategory} />
      </div>
    </div>
  );
};

export default CategoryPage;
