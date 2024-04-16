import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.recipe.findMany();
    if (!entries.length) {
      return Response.json(
        { message: "No entries found" },
        {
          status: 404,
        },
      );
    }
    return Response.json(entries, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const entry = await prisma.recipeIngredient.create({
      data: {
        recipeId: data.recipeId,
        productId: data.productId,
        quantity: data.quantity,
      },
    });
    if (!entry) {
      return Response.json({ message: "Entry not found" }, { status: 400 });
    }
    return Response.json({ message: "Entry updated", entry }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const data = await req.json();
  try {
    const entry = await prisma.recipe.update({
      where: {
        id: data.id,
      },
      data,
    });
    return Response.json({ message: "Entry updated", entry }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const data = await req.json();
  try {
    const entry = await prisma.recipe.delete({
      where: {
        id: data.id,
      },
    });
    return Response.json({ message: "Entry deleted", entry }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
