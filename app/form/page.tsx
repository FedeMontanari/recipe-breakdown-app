import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function FormPage() {
  const data = await prisma.recipe.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center p-5 gap-y-4">
      <h1 className="text-4xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl border-b">
        Recipe Breakdown App
      </h1>
      <div className="flex flex-row items-center justify-center flex-wrap gap-y-3 gap-x-2">
        {data.map((v, i) => (
          <Button key={i} asChild>
            <Link href={`/form/${v.id}`}>{v.name}</Link>
          </Button>
        ))}
      </div>
    </main>
  );
}
