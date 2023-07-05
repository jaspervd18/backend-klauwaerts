import { prisma } from "../repository/db";

const getAll = async (month: number, year: number) => {
  const count = await prisma.competition.count();
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const competitions = await prisma.competition.findMany({
    where: {
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      id: true,
      type: true,
      title: true,
      date: true,
      referee: {
        select: {
          id: true,
          name: true,
        },
      },
      coach: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return { count, competitions };
};

const getById = async (id: number) => {
  const data = await prisma.competition.findUnique({
    where: { id },
    select: {
      id: true,
      type: true,
      title: true,
      date: true,
      referee: {
        select: {
          id: true,
          name: true,
        },
      },
      coach: {
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
  const { type, title, date } = body;
  return prisma.competition.create({
    data: {
      type: type,
      title: title,
      date: date,
    },
  });
};

const updateById = async (id: number, body: any) => {
  if ((await getById(id)) === null) return null;
  const { type, title, date, refereeId, coachId } = body;
  const hasReferee = refereeId > 0;
  const hasCoach = coachId > 0;
  return prisma.competition.update({
    where: { id },
    data: {
      type: type,
      title: title,
      date: date,
      referee: hasReferee ? { connect: { id: refereeId } } : undefined,
      coach: hasCoach ? { connect: { id: coachId } } : undefined,
    },
  });
};

const deleteById = async (id: number) => {
  if ((await getById(id)) === null) return null;
  return prisma.competition.delete({
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
