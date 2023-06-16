import { Prisma } from "@prisma/client";
import { prisma } from "../repository/db";

const getById = async (id: number) => {
	const data = await prisma.notificatie.findUnique({
		where: { id },
		select: {
			id: true,
			createdAt: true,
			statusBestelling: true,
			toestand: true,
			bestellingId: true,
			klantId: true,
		},
	});
	return data;
};

const updateById = async (
	id: number,
	notificatie: Prisma.NotificatieUpdateInput
) => {
	if ((await getById(id)) === null) return null;
	else
		return prisma.notificatie.update({
			where: { id },
			data: notificatie,
		});
};

const create = async (bestellingId: number, aankoperId: number) => {
	const aankoper = await prisma.aankoper.findUnique({
		where: { id: aankoperId },
		select: { klantId: true },
	});
	if (!aankoper) return null;
	return prisma.notificatie.create({
		data: {
			bestelling: {
				connect: {
					id: bestellingId,
				},
			},
			klant: {
				connect: {
					id: aankoper.klantId,
				},
			},
		},
	});
};

export default {
	create,
	updateById,
};
