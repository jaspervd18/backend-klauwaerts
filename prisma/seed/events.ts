import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedEvents() {
  if ((await prisma.event.count()) > 0) return;
  for (const event of EVENTS) {
    await prisma.event.create({
      data: {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        trainerId: event.trainerId,
      },
    });
    console.log(`Created event with id: ${event.id}`);
  }
}

const EVENTS = [
  {
    id: 1,
    title: "Schermschool",
    start: new Date("2023-06-16T16:00:00.000Z"),
    end: new Date("2023-06-16T17:30:00.000Z"),
    trainerId: 1,
  },
  {
    id: 2,
    title: "Beloften & Volwassenen",
    start: new Date("2023-06-16T17:30:00.000Z"),
    end: new Date("2023-06-16T19:30:00.000Z"),
    trainerId: 2,
  },
];
