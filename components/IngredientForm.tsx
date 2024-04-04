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
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formSchema = z
  .object({
    name: z
      .string({
        required_error: "Debe ingresar el nombre",
        invalid_type_error: "El nombre debe ser solamente texto",
      })
      .min(5, {
        message: "El nombre debe tener al menos 5 caracteres",
      })
      .max(50, {
        message: "El nombre debe tener no más de 50 caracteres",
      }),
    price: z.string().refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 0;
      },
      { message: "El precio debe ser un número positivo. Entero o decimal" }
    ),
  })
  .transform((data) => ({
    ...data,
    slug: data.name.trim().toLowerCase().replace(/\s+/g, "_"),
  }));

export default function IngredientForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "0",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const postValues = {
      ...values,
      price: Number(values.price),
    };

    setLoading(true);

    fetch("/api/ingredient", {
      method: "POST",
      body: JSON.stringify(postValues),
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
          "Ha ocurrido un error con el servidor. Por favor, intente de nuevo. Si el problema persiste comuniquese con el administrador"
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
                <Input
                  type="text"
                  placeholder="Ej: Harina de Trigo"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Este será el nombre del ingrediente en la lista
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>

                  <Input
                    type="number"
                    className="pl-7"
                    placeholder="0.00"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Valor <i className="font-semibold">unitario</i> del ingrediente.
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
