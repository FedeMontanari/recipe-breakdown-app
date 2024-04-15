import { prisma } from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const dynamic = "force-dynamic";

export default async function RecipesPage() {
  const recipeData = await prisma.recipe.findMany();

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-semibold tracking-tight">
        Lista de Recetas
      </h2>
      <DataTable columns={columns} data={recipeData} />
    </div>
  );
}
