import { PrismaClient } from "@prisma/client";
import seedEvents from "./seed/events";
import seedTrainers from "./seed/trainers";
import seedDegrees from "./seed/degrees";
import seedStudents from "./seed/students";
const prisma = new PrismaClient();

async function main() {
  await seedStudents();
  await seedDegrees();
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
