"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Debe ingresar el nombre",
      invalid_type_error: "El nombre debe ser solamente texto",
    })
    .min(5, {
      message: "El nombre debe tener al menos 5 caracteres",
    })
    .max(100, {
      message: "El nombre debe tener no más de 100 caracteres",
    }),
});

export default function RecipeForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    fetch("/api/recipe", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          form.reset();
          toast("Creado con exito. Puede cerrar el formulario");
        } else {
          toast("Ha ocurrido un error, por favor, intente nuevamente");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast(
          "Ha ocurrido un error con el servidor. Por favor, intente de nuevo. Si el problema persiste comuniquese con el administrador",
        );
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ej: Salsa Tartara" {...field} />
              </FormControl>
              <FormDescription>
                Este será el nombre de la receta. Puede agregar ingredientes a
                la receta luego.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <p>
            Cargando <LoaderCircle className="inline animate-spin" />
          </p>
        ) : (
          <Button type="submit">Guardar</Button>
        )}
      </form>
    </Form>
  );
}
