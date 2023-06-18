import { prisma } from "../repository/db";

const getAll = async (limit: number, offset: number) => {
  const data = await prisma.event.findMany({
    take: limit,
    skip: offset,
  });
  return data;
};

const getById = async (id: number) => {
  const data = await prisma.trainer.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
  if (data === null) return null;
  return {
    ...data,
  };
};

export default {
  getAll,
  getById,
};
