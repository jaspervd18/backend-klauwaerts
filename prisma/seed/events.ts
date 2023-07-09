import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedEvents() {
  if ((await prisma.event.count()) > 0) return;
  for (const event of EVENTS) {
    await prisma.event.create({
      data: {
        id: event.id,
        title: event.title,
        type: event.type,
        start: event.start,
        end: event.end,
        trainerId: event.trainerId,
        coachId: event.coachId,
        refereeId: event.refereeId,
      },
    });
    console.log(`Created event with id: ${event.id}`);
  }
}

const EVENTS = [
  {
    id: 1,
    title: "Schermschool",
    start: new Date("2023-07-14T16:00:00.000Z"),
    end: new Date("2023-07-14T17:30:00.000Z"),
    trainerId: 1,
  },
  {
    id: 2,
    title: "Beloften & Volwassenen",
    start: new Date("2023-07-17T17:30:00.000Z"),
    end: new Date("2023-07-17T19:30:00.000Z"),
    trainerId: 2,
  },
  {
    id: 3,
    title: "Schermschool",
    start: new Date("2023-07-21T16:00:00.000Z"),
    end: new Date("2023-07-21T17:30:00.000Z"),
  },
  {
    id: 4,
    title: "Beloften & Volwassenen",
    start: new Date("2023-07-21T17:30:00.000Z"),
    end: new Date("2023-07-21T19:30:00.000Z"),
  },
  {
    id: 5,
    title: "Clubbeker",
    start: new Date("2023-07-26T16:00:00.000Z"),
    end: new Date("2023-07-26T19:30:00.000Z"),
    trainerId: 1,
  },
  {
    id: 6,
    title: "Miniklauw",
    type: "Regionaal",
    start: new Date("2023-07-29"),
    end: new Date("2023-07-29"),
    coachId: 3,
    refereeId: 4,
  },
  {
    id: 7,
    title: "Gulden Klauw",
    type: "Nationaal",
    start: new Date("2023-07-22"),
    end: new Date("2023-07-22"),
    coachId: 1,
    refereeId: 2,
  },
];
