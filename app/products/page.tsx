import { prisma } from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ProductsPage() {
  const productData = await prisma.ingredient.findMany();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={productData} />
    </div>
  );
}
