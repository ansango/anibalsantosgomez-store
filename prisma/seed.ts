import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const exercises: any[] = [];

async function main() {
  // Promise.all([
  //   await prisma.exercise.deleteMany(),
  //   ...exercises.map(async (exercise) => {
  //     await prisma.exercise.create({
  //       data: {
  //         ...exercise,
  //       },
  //     });
  //   }),
  // ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
