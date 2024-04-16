"use client";

import ColumnActionsComponent from "@/components/ColumnActionsComponent";
import IngredientList from "@/components/IngredientList";
import { Checkbox } from "@/components/ui/checkbox";
import { Product, RecipeIngredient } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<{
  id: number;
  name: string;
  recipeItems: ({
    product: Product;
  } & RecipeIngredient)[];
}>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    id: "productList",
    header: "Ingredientes",
    cell: ({ row }) => {
      const recipe = row.original;

      return <IngredientList recipe={recipe} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const recipe = row.original;

      return <ColumnActionsComponent recipe={recipe} />;
    },
  },
];
