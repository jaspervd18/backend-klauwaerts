import { prisma } from "../repository/db";

const getById = async (id: number) => {
	return prisma.aankoper.findUnique({
		where: { id },
		include: {
			klant: {
				include: {
					aankopers: true,
					adres: true,
				}
			}
		}
	});
};

const getByEmail = async (email: string) => {
	return prisma.aankoper.findFirst({
		where: { email },
		select: {
			id: true,
			email: true,
			wachtwoord: true,
		},
	});
};

export default {
	getById,
	getByEmail,
};
