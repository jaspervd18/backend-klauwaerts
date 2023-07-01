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
    name: "Geen",
    payment: 10.0,
  },
  {
    id: 2,
    name: "Aspirant + hoofdpiratenjuf",
    payment: 11.0,
  },
  {
    id: 3,
    name: "Initiator",
    payment: 13.0,
  },
  {
    id: 4,
    name: "Trainer C",
    payment: 15.0,
  },
  {
    id: 5,
    name: "Trainer B",
    payment: 20.0,
  },
  {
    id: 6,
    name: "Trainer A",
    payment: 30.0,
  },
];
