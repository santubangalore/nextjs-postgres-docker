
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData = [
  {
    id: '1',
    title: "Task one",
    completed: true,
  
  },
  {
    id: '2',
    title: "Task two",
    completed: false,
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.task.create({ data: u });
  }
}

main();