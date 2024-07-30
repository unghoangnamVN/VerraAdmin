import { db } from "@/lib/db";
import { CategoryClient } from "./_components/client";
import { SubCategoryColumn } from "./_components/column";
import { format } from "date-fns";

const SubcategoriesPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const subcategories = await db.subcategory.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSubcategories: SubCategoryColumn[] = subcategories.map(
    (item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category.name,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedSubcategories} />
      </div>
    </div>
  );
};

export default SubcategoriesPage;
