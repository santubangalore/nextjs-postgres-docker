"use server";

import {prisma} from "@/lib/db";

export async function addData(formData: FormData) {
  const title = formData.get("title") as string;

  const task = await prisma.task.create({
    data: {
      title,
      completed: false,
    },
  });

  return task;
}

