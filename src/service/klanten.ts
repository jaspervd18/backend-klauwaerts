import { prisma } from "../repository/db";

const getById = async (id: number) => {
  return prisma.klant.findUnique({
    where: { id },
    select: {
      id: true,
      naam: true,
      logo: true,
      adres: true,
      gsm: true,
      aankopers: {
        select: {
          id: true,
          naam: true,
          voornaam: true,
          email: true,
        },
      },
    },
  });
};

const getBestellingenByKlantId = async (
  id: number,
  limit: number,
  offset: number
) => {
  const klant = await prisma.klant.findUnique({
    where: { id },
    select: {
      aankopers: {
        select: {
          bestellingen: {
            take: limit,
            skip: offset,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              status: true,
              createdAt: true,
              bestelregels: {
                select: {
                  aantal: true,
                  product: {
                    select: {
                      prijs: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return klant?.aankopers.flatMap((aankoper) => {
    return aankoper.bestellingen.map((bestelling) => {
      const totaalPrijs = bestelling.bestelregels.reduce(
        (totaal, bestelregel) =>
          totaal + bestelregel.aantal * bestelregel.product.prijs,
        0
      );
      const { id, status, createdAt } = bestelling;
      return {
        id,
        status,
        createdAt,
        totaalPrijs,
      };
    });
  });
};

const getNotificatiesByKlantId = async (
  id: number,
  limit: number,
  offset: number
) => {
  return prisma.notificatie.findMany({
    where: { klantId: id },
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      statusBestelling: true,
      bestellingId: true,
      klantId: true,
      createdAt: true,
      toestand: true,
    },
  });
};

export default {
  getById,
  getBestellingenByKlantId,
  getNotificatiesByKlantId,
};
