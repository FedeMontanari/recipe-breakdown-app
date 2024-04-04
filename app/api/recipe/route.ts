import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.recipe.findMany();
    if (!entries.length) {
      return Response.json(
        { message: "No entries found" },
        {
          status: 404,
        }
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
    const newEntry = await prisma.recipe.create({
      data,
    });
    return Response.json(
      { message: "Entry created", newEntry },
      { status: 201 }
    );
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
