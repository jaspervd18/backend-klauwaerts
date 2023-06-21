import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedDegrees() {
  if ((await prisma.degree.count()) > 0) return;
  for (const degree of DEGREES) {
    await prisma.degree.create({
      data: {
        id: degree.id,
        name: degree.name,
        payment: degree.payment,
      },
    });
    console.log(`Created degree with id: ${degree.id}`);
  }
}

const DEGREES = [
  {
    id: 1,
    name: "Initiator",
    payment: 11.0,
  },
  {
    id: 2,
    name: "Trainer C",
    payment: 13.0,
  },
  {
    id: 3,
    name: "Trainer B",
    payment: 14.5,
  },
  {
    id: 4,
    name: "Trainer A",
    payment: 17.0,
  },
];
