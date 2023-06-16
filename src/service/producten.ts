import { prisma } from "../repository/db";

const getAll = async (page: number) => {
	const perPage = 8;
	const count = await prisma.product.count();
	const totalPages = Math.floor(count / perPage) + 1;
	const producten = await prisma.product.findMany({
		take: perPage,
		skip: perPage * (page - 1),
	});
	return {
		page,
		perPage,
		count,
		totalPages,
    hasMore: page < totalPages,
		producten,
	};
};

const getById = async (id: number) => {
	return prisma.product.findUnique({ where: { id } });
};

export default {
	getAll,
	getById,
};
