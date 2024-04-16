"use client";

import * as React from "react";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@prisma/client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ProductsCombobox({ recipeId }: { recipeId: number }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [quantity, setQuantity] = React.useState<number>(0);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [products, setProducts] = React.useState<Product[]>([]);

  const router = useRouter();

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const req = await fetch("/api/product");
      const data = await req.json();
      setProducts(data);
      setLoading(false);
    })();
  }, []);

  function addProductHandler() {
    const product = products.find((pr) => pr.slug === value);

    if (product) {
      const postData = {
        quantity,
        productId: product.id,
        recipeId,
      };
      return fetch("/api/recipe/product", {
        method: "POST",
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) =>
          console.error("Ha ocurrido un error, por favor intente de nuevo"),
        );
    } else {
      return Promise.reject("Producto no encontrado");
    }
  }

  return (
    <>
      <div className="flex w-full items-center justify-center">
        {loading ? (
          <div>
            <LoaderCircle className="inline animate-spin" /> Cargando...
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Añadir Producto</p>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? products.find((pr) => pr.slug === value)?.name
                        : "Añadir producto"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar producto..." />
                      <CommandEmpty>No se encontraron productos.</CommandEmpty>
                      <CommandGroup>
                        {products.map((pr) => (
                          <CommandItem
                            key={pr.id}
                            value={pr.slug}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === pr.slug ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {pr.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label
                  htmlFor="quantity"
                  className="text-sm text-muted-foreground"
                >
                  Cantidad
                </Label>
                <Input
                  aria-label="quantity"
                  id="quantity"
                  onChange={(ev) => setQuantity(ev.target.valueAsNumber)}
                  type="number"
                  value={quantity}
                  placeholder="Cantidad  del producto"
                />
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => {
                toast.promise(addProductHandler(), {
                  loading: "Cargando...",
                  success: (data) => {
                    router.refresh();
                    return `${data.entry}`;
                  },
                  error: "Ha ocurrido un error, por favor intente de nuevo",
                });
              }}
            >
              Añadir
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
