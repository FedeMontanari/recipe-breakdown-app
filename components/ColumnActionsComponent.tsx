import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Product, Recipe } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";

export default function ColumnActionsComponent({
  product,
  recipe,
  ...props
}: {
  product?: Product;
  recipe?: Recipe;
}) {
  if (product) return <ProductComponent product={product} />;
  if (recipe) return <RecipeComponent recipe={recipe} />;
}

function RecipeComponent({ recipe }: { recipe: Recipe }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editRecipeData, setEditRecipeData] = useState<Recipe>(recipe);

  const router = useRouter();

  function deleteHandler(recipe: Recipe) {
    return fetch("/api/recipe", {
      method: "DELETE",
      body: JSON.stringify(recipe),
    })
      .then((res) => res.json())
      .then((data) => {
        return data.entry;
      })
      .catch((err) => {
        console.error(err);
        toast.error("Ha ocurrido un error, por favor intente de nuevo");
      });
  }

  function editChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEditRecipeData({
      ...editRecipeData,
      [e.target.name]: e.target.value,
    });
  }

  function editHandler() {
    return fetch("/api/recipe", {
      method: "PUT",
      body: JSON.stringify(editRecipeData),
    })
      .then((res) => res.json())
      .then((data) => data.entry)
      .catch((err) => {
        console.error(err);
        toast.error("Ha ocurrido un error, por favor intente de nuevo");
      });
  }

  useEffect(() => {
    setEditRecipeData(recipe);
  }, [isEditDialogOpen]);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Abrir Menú</span>
            <MoreHorizontal size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive"
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isEditDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Editar Receta</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <Label>Nombre</Label>
              <Input
                type="text"
                value={editRecipeData.name}
                name="name"
                onChange={editChangeHandler}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast.promise(editHandler(), {
                  loading: "Cargando...",
                  success: (data) => {
                    router.refresh();
                    return `${data.name} fue editado con éxito`;
                  },
                  error: "Ha ocurrido un error, intente de nuevo",
                });
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Desea eliminar esta receta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer y eliminara esta receta de la
              base de datos de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast.promise(deleteHandler(recipe), {
                  loading: "Cargando...",
                  success: (data) => {
                    router.refresh();
                    return `${data.name} fue eliminado con éxito`;
                  },
                  error: "Ha ocurrido un error, intente de nuevo",
                });
              }}
              className="bg-destructive"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function ProductComponent({ product }: { product: Product }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [editProductData, setEditProductData] = useState<Product>(product);

  const router = useRouter();

  function deleteHandler(product: Product) {
    return fetch("/api/product", {
      method: "DELETE",
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        return data.entry;
      })
      .catch((err) => {
        console.error(err);
        toast.error("Ha ocurrido un error, por favor intente de nuevo");
      });
  }

  function editChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEditProductData({
      ...editProductData,
      [e.target.name]: e.target.value,
    });
  }

  function editHandler() {
    const parsedValue = parseFloat(editProductData.price.toString());
    const endpointData = {
      ...editProductData,
      slug: editProductData.name.trim().toLowerCase().replace(/\s+/g, "_"),
      price: parsedValue,
    };

    if (isNaN(parsedValue) && parsedValue <= 0) {
      return new Promise((resolve, reject) => {
        reject(
          new Error("El precio debe ser un número positivo. Entero o decimal"),
        );
      }).catch((err) => console.error(err));
    }

    return fetch("/api/product", {
      method: "PUT",
      body: JSON.stringify(endpointData),
    })
      .then((res) => res.json())
      .then((data) => data.entry)
      .catch((err) => {
        console.error(err);
        toast.error("Ha ocurrido un error, por favor intente de nuevo");
      });
  }

  useEffect(() => {
    setEditProductData(product);
  }, [isEditDialogOpen]);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Abrir Menú</span>
            <MoreHorizontal size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive"
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isEditDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Editar Producto</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <Label>Nombre</Label>
              <Input
                type="text"
                value={editProductData.name}
                name="name"
                onChange={editChangeHandler}
              />
              <div className="grid grid-cols-5 gap-x-3">
                <div className="col-span-3">
                  <Label>Precio</Label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <Input
                      type="number"
                      value={editProductData.price}
                      name="price"
                      onChange={editChangeHandler}
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <Label>Unidad</Label>
                  <Select
                    defaultValue={editProductData.unit}
                    onValueChange={(
                      value: "kilogram" | "liter" | "unit" | "unkown",
                    ) =>
                      setEditProductData({
                        ...editProductData,
                        unit: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una unidad de medida" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kilogram">Kilogramo</SelectItem>
                      <SelectItem value="liter">Litro</SelectItem>
                      <SelectItem value="unit">Unidad</SelectItem>
                      <SelectItem value="unkown">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast.promise(editHandler(), {
                  loading: "Cargando...",
                  success: (data) => {
                    router.refresh();
                    return `${data.name} fue editado con éxito`;
                  },
                  error: "Ha ocurrido un error, intente de nuevo",
                });
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Desea eliminar este producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer y eliminara este producto de la
              base de datos de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast.promise(deleteHandler(product), {
                  loading: "Cargando...",
                  success: (data) => {
                    router.refresh();
                    return `${data.name} fue eliminado con éxito`;
                  },
                  error: "Ha ocurrido un error, intente de nuevo",
                });
              }}
              className="bg-destructive"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
