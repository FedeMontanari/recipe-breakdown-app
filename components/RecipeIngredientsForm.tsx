"use client";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Ingredient, Recipe } from "@prisma/client";

import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";

export default function RecipeIngredientsForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dialogLoading, setDialogLoading] = useState<boolean>(true);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch("/api/recipe")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        fetch("/api/ingredient")
          .then((res) => res.json())
          .then((data) => {
            setIngredients(data);
            setDialogLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setDialogLoading(true);
          });
      })
      .catch((err) => {
        console.error(err);
        setDialogLoading(true);
      });
  }, []);

  function onSubmit() {
    setLoading(true);

    const values = {};

    fetch("/api/recipe", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          toast("Creado con exito. Puede cerrar el formulario");
        } else {
          toast("Ha ocurrido un error, por favor, intente nuevamente");
        }
      })
      .catch((err) => {
        console.error(err);
        toast(
          "Ha ocurrido un error con el servidor. Por favor, intente de nuevo. Si el problema persiste comuniquese con el administrador"
        );
      });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {dialogLoading ? (
        <p className="text-lg font-bold">
          Cargando <LoaderCircle className="inline animate-spin" />
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-8">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? ingredients.find((v) => v.name === value)?.name
                  : "Seleccionar"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Buscar..." />
                <CommandEmpty>No se encontró ingrediente</CommandEmpty>
                <CommandGroup>
                  {ingredients.map((ing, i) => (
                    <CommandItem
                      key={ing.id}
                      value={ing.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === ing.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {ing.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {loading ? (
            <p>
              Cargando <LoaderCircle className="inline animate-spin" />
            </p>
          ) : (
            <Button type="submit">Guardar</Button>
          )}
        </form>
      )}
    </div>
  );
}
