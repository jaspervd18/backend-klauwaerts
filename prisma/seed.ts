import { PrismaClient } from "@prisma/client";
import seedEvents from "./seed/events";
import seedTrainers from "./seed/trainers";
const prisma = new PrismaClient();

async function main() {
  await seedTrainers();
  await seedEvents();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
