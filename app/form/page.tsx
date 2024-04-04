import IngredientForm from "@/components/IngredientForm";
import RecipeForm from "@/components/RecipeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormPage() {
  return (
    <main className="flex flex-col items-center justify-evenly min-h-screen gap-3 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Ingrediente</CardTitle>
        </CardHeader>
        <CardContent>
          <IngredientForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Receta</CardTitle>
        </CardHeader>
        <CardContent>
          <RecipeForm />
        </CardContent>
      </Card>
    </main>
  );
}
