import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5 gap-y-4">
      <h1 className="text-4xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl border-b">
        Recipe Breakdown App
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        List of Recipes:
      </h3>
      <div className="w-1/3">
        <Link href="/form">Formulario</Link>
      </div>
    </main>
  );
}
