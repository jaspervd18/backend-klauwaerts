import { prisma } from "../repository/db";

const getAll = async (month: number, year: number) => {
  const count = await prisma.event.count();
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const events = await prisma.event.findMany({
    where: {
      start: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      id: true,
      title: true,
      type: true,
      start: true,
      end: true,
      trainer: {
        select: {
          id: true,
          name: true,
        },
      },
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
      afwezigen: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return { count, events };
};

const getById = async (id: number) => {
  const data = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      type: true,
      start: true,
      end: true,
      trainer: {
        select: {
          id: true,
          name: true,
        },
      },
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
      afwezigen: {
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
  const { title, start, end, trainerId, coachId, refereeId, afwezigen } = body;
  const hasTrainer = trainerId > 0;
  const hasCoach = coachId > 0;
  const hasReferee = refereeId > 0;
  return prisma.event.update({
    where: { id },
    data: {
      title: title,
      start: start,
      end: end,
      trainer: hasTrainer ? { connect: { id: trainerId } } : undefined,
      coach: hasCoach ? { connect: { id: coachId } } : undefined,
      referee: hasReferee ? { connect: { id: refereeId } } : undefined,
      afwezigen: afwezigen?.length > 0 ? { connect: afwezigen } : undefined,
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
