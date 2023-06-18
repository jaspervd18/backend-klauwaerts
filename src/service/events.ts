import { prisma } from "../repository/db";

const getAll = async (limit: number, offset: number) => {
  const data = await prisma.event.findMany({
    take: limit,
    skip: offset,
  });
  return data;
};

const getById = async (id: number) => {
  const data = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      start: true,
      end: true,
      trainer: {
        select: {
          id: true,
          name: true,
        },
      },
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

const deleteById = async (id: number) => {
  if ((await getById(id)) === null) return null;
  return prisma.event.delete({
    where: { id },
  });
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
