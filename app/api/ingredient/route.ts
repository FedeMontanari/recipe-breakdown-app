import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.ingredient.findMany();
    return Response.json(entries, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const newEntry = await prisma.ingredient.create({
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
    const entry = await prisma.ingredient.update({
      where: {
        id: data.id,
      },
      data,
    });
    if (entry) {
      return Response.json(
        { message: "Entry updated", entry },
        { status: 200 }
      );
    }
    return Response.json({ message: "Entry not found" }, { status: 404 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const data = await req.json();
  try {
    const entry = await prisma.ingredient.delete({
      where: {
        id: data.id,
      },
    });
    if (entry) {
      return Response.json(
        { message: "Entry deleted", entry },
        { status: 200 }
      );
    }
    return Response.json({ message: "Entry not found" }, { status: 404 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
