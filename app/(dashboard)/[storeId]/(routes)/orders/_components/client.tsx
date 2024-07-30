import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./column";
import { DataTable } from "./data-table";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage order for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
