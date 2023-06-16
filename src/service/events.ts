import { prisma } from "../repository/db";

const getById = async (id: number) => {
  const data = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      start: true,
      end: true,
    },
  });
  if (data === null) return null;
  return {
    ...data,
  };
};

const create = async (body: any) => {
  const { title, start, end } = body;
  return prisma.event.create({
    data: {
      title: title,
      start: start,
      end: end,
    },
  });
};

const updateById = async (id: number, body: any) => {
  if ((await getById(id)) === null) return null;
  const { title, start, end } = body;
  return prisma.event.update({
    where: { id },
    data: {
      title: title,
      start: start,
      end: end,
    },
  });
};

export default {
  getById,
  create,
  updateById,
};
