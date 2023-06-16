import { prisma } from "../repository/db";

const getAll = async (limit: number, offset: number) => {
  const data = await prisma.doos.findMany({
    take: limit,
    skip: offset,
  });
  return data;
};

export default {
  getAll,
};
