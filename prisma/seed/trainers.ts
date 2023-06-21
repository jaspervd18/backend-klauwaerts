import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedTrainers() {
  if ((await prisma.trainer.count()) > 0) return;
  for (const trainer of TRAINERS) {
    await prisma.trainer.create({
      data: {
        id: trainer.id,
        name: trainer.name,
        degreeId: trainer.degreeId,
      },
    });
    console.log(`Created trainer with id: ${trainer.id}`);
  }
}

const TRAINERS = [
  {
    id: 1,
    name: "Jasper Van Dyck",
    degreeId: 2,
  },
  {
    id: 2,
    name: "Saartje Corteyn",
    degreeId: 2,
  },
  {
    id: 3,
    name: "Ynte Audenaert",
    degreeId: 1,
  },
];
