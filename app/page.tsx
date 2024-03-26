import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const data = await prisma.recipe.findMany({
    include: {
      ingredientsList: true,
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center p-5 gap-y-4">
      <h1 className="text-4xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl border-b">
        Recipe Breakdown App
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        List of Recipes:
      </h3>
      <div className="w-1/3">
        {data.map((v, i) => {
          return (
            <Accordion key={i} type="single" collapsible>
              <AccordionItem value={v.slug}>
                <AccordionTrigger>{v.name}</AccordionTrigger>
                <AccordionContent>
                  {v.ingredientsList.map((ing, i) => {
                    return (
                      <div key={i}>
                        <p>{ing.name}</p>
                        <p>$ {ing.price}</p>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </main>
  );
}
