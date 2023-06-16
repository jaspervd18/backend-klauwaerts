import { prisma } from "../repository/db";

const getById = async (id: number) => {
	const data = await prisma.bestelling.findUnique({
		where: { id },
		select: {
			id: true,
			status: true,
			createdAt: true,
			trackAndTrace: {
				select: {
					code: true,
				},
			},
			leverAdres: {
				select: {
					straat: true,
					huisnummer: true,
					postcode: true,
					land: true,
				},
			},
			doos: {
				select: {
					id: true,
					naam: true,
				},
			},
			bestelregels: {
				select: { id: true, aantal: true, product: true },
			},
		},
	});
	if (data === null) return null;
	const totaalPrijs = data?.bestelregels.reduce(
		(totaal, bestelregel) =>
			totaal + bestelregel.aantal * bestelregel.product.prijs,
		0
	);
	return {
		...data,
		totaalPrijs,
	};
};

const create = async (body: any) => {
	const {
		aankoperId,
		straat,
		huisnummer,
		postcode,
		land,
		doosId,
		bestelregels,
	} = body;
	return prisma.bestelling.create({
		data: {
			aankoper: {
				connect: {
					id: aankoperId,
				},
			},
			leverAdres: {
				connectOrCreate: {
					where: {
						straat_huisnummer_postcode_land: {
							straat,
							huisnummer,
							postcode,
							land,
						},
					},
					create: {
						straat,
						huisnummer,
						postcode,
						land,
					},
				},
			},
			doos: {
				connect: {
					id: doosId,
				},
			},
			bestelregels: {
				create: bestelregels.map(
					(bestelregel: {
						aantal: number;
						prijs: number;
						productId: number;
					}) => ({
						aantal: bestelregel.aantal,
						prijs: bestelregel.prijs,
						product: {
							connect: {
								id: bestelregel.productId,
							},
						},
					})
				),
			},
		},
	});
};

const updateById = async (id: number, body: any) => {
	if ((await getById(id)) === null) return null;
	const { doosId, huisnummer, land, postcode, straat } = body;
	const hasDoos = doosId > 0;
	return prisma.bestelling.update({
		where: { id },
		data: {
			doos: hasDoos ? { connect: { id: doosId } } : undefined,
			leverAdres: {
				connectOrCreate: {
					where: {
						straat_huisnummer_postcode_land: {
							straat,
							huisnummer,
							postcode,
							land,
						},
					},
					create: {
						straat,
						huisnummer,
						postcode,
						land,
					},
				},
			},
		},
	});
};

export default {
	getById,
	create,
	updateById,
};
