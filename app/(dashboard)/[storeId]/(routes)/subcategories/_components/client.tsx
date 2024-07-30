"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SubCategoryColumn, columns } from "./column";
import { DataTable } from "@/components/data-table/data-table";

interface CategoryClientProps {
  data: SubCategoryColumn[];
}

export const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Subcategories (${data.length})`}
          description="Manage subcategories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/subcategories/new`)}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
