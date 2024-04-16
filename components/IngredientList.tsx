import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, RecipeIngredient } from "@prisma/client";
import { ProductsCombobox } from "@/components/ProductsCombobox";

import { ClipboardList } from "lucide-react";
import { Separator } from "./ui/separator";

export default function IngredientList({
  recipe,
}: {
  recipe: {
    id: number;
    name: string;
    recipeItems: ({
      product: Product;
    } & RecipeIngredient)[];
  };
}) {
  const total = recipe.recipeItems.map((r) => r.product.price / r.quantity);

  const units = {
    kilogram: "Kg.",
    liter: "Litro(s)",
    unit: "Unidad(es)",
    unkown: "Otro",
  };

  return (
    <Dialog>
      <DialogTrigger>
        <ClipboardList />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingredientes para {recipe.name}</DialogTitle>
          <DialogDescription>
            {recipe.recipeItems.length ? (
              <>
                <Table className="mb-12 mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipe.recipeItems.map((pr) => {
                      return (
                        <TableRow key={pr.id}>
                          <TableCell>{pr.product.name}</TableCell>
                          <TableCell>{units[pr.product.unit]}</TableCell>
                          <TableCell>{pr.quantity}</TableCell>
                          <TableCell className="text-right">
                            $ {(pr.product.price / pr.quantity).toFixed(0)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">
                        $ {total.reduce((a, b) => a + b).toFixed(0)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </>
            ) : (
              "Esta receta no tiene productos"
            )}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogFooter>
          <ProductsCombobox recipeId={recipe.id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
