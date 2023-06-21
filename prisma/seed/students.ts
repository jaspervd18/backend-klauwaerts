import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedStudents() {
  if ((await prisma.student.count()) > 0) return;
  for (const student of STUDENTS) {
    await prisma.student.create({
      data: {
        id: student.id,
        name: student.name,
      },
    });
    console.log(`Created student with id: ${student.id}`);
  }
}

const STUDENTS = [
  {
    id: 1,
    name: "Charlotte Ros",
  },
  {
    id: 2,
    name: "Mauro Massie",
  },
  {
    id: 3,
    name: "Jules Denis",
  },
  {
    id: 4,
    name: "Miel D'Hollander",
  },
];
