import { prisma } from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const productData = await prisma.product.findMany();
  return (
    <div className="container mx-auto py-10">
      <h2 className="tracking-tight text-2xl font-semibold">Lista de Productos</h2>
      <DataTable columns={columns} data={productData} />
    </div>
  );
}
