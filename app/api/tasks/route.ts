
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  
  const { title, completed } = body ?? {};

  if (!title || typeof title !== "string") {
    return new Response(JSON.stringify({ error: "Title is required" }), {
      status: 400
    });
  }

  const created = await prisma.task.create({
    data: {
      title,
      completed: completed ?? false
    }
  });

  return new Response(JSON.stringify(created), { status: 201 });
}
