import IngredientForm from "@/components/IngredientForm";
import RecipeForm from "@/components/RecipeForm";
import RecipeIngredientsForm from "@/components/RecipeIngredientsForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Beef, ClipboardList, CookingPot } from "lucide-react";

const options = [
  {
    name: "Ingrediente",
    jsx: <IngredientForm />,
    icon: <Beef className="inline" />,
  },
  {
    name: "Receta",
    jsx: <RecipeForm />,
    icon: <CookingPot className="inline" />,
  },
  // {
  //   name: "Ingredientes a una Receta",
  //   jsx: <RecipeIngredientsForm />,
  //   icon: <ClipboardList className="inline" />,
  // },
];

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5 gap-y-4">
      <h1 className="text-4xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl border-b">
        Recipe Breakdown App
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Dashboard
      </h3>
      {options.map((v, i) => (
        <Dialog key={i}>
          <Button variant="link" asChild>
            <DialogTrigger className="flex flex-row items-center gap-x-2">
              Añadir {v.name}
              {v.icon}
            </DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete el formulario</DialogTitle>
              <DialogDescription>{v.jsx}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </main>
  );
}
