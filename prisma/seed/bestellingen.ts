import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedBestellingen() {
	if ((await prisma.bestelling.count()) > 0) return;
	for (const bestelling of BESTELLINGEN) {
		await prisma.bestelling.create({
			data: {
				id: bestelling.id,
				aankoperId: bestelling.aankoperId,
				doosId: bestelling.doosId,
				leverAdresId: bestelling.leverAdresId,
				status: bestelling.status,
				bestelregels: {
					create: bestelling.bestelregels,
				},
			},
		});
		console.log(`Created bestelling with id: ${bestelling.id}`);
	}
}

const BESTELLINGEN = [
	{
		id: 9,
		aankoperId: 2,
		leverAdresId: 3,
		status: 0,
		bestelregels: [
			{
				productId: 13,
				aantal: 12,
				prijs: 12 * 79.99,
			},
			{
				productId: 8,
				aantal: 34,
				prijs: 34 * 299.99,
			},
		],
	},
	{
		id: 1,
		aankoperId: 1,
		doosId: 1,
		leverAdresId: 1,
		status: 0,
		bestelregels: [
			{
				productId: 1,
				aantal: 20,
				prijs: 20 * 89.99,
			},
			{
				productId: 2,
				aantal: 13,
				prijs: 13 * 149.99,
			},
			{
				productId: 7,
				aantal: 16,
				prijs: 16 * 99.99,
			},
			{
				productId: 12,
				aantal: 27,
				prijs: 27 * 119.99,
			},
		],
	},
	{
		id: 2,
		aankoperId: 2,
		doosId: 2,
		leverAdresId: 2,
		status: 2,
		bestelregels: [
			{
				productId: 3,
				aantal: 28,
				prijs: 28 * 29.99,
			},
			{
				productId: 11,
				aantal: 19,
				prijs: 19 * 49.99,
			},
		],
	},
	{
		id: 3,
		aankoperId: 3,
		doosId: 3,
		leverAdresId: 3,
		status: 3,
		bestelregels: [
			{
				productId: 4,
				aantal: 23,
				prijs: 23 * 39.99,
			},
			{
				productId: 9,
				aantal: 14,
				prijs: 14 * 129.99,
			},
		],
	},
	{
		id: 5,
		aankoperId: 1,
		doosId: 5,
		leverAdresId: 1,
		status: 1,
		bestelregels: [
			{
				productId: 6,
				aantal: 83,
				prijs: 83 * 69.99,
			},
			{
				productId: 5,
				aantal: 64,
				prijs: 64 * 59.99,
			},
		],
	},
	{
		id: 6,
		aankoperId: 5,
		doosId: 1,
		leverAdresId: 2,
		status: 0,
		bestelregels: [
			{
				productId: 9,
				aantal: 14,
				prijs: 14 * 129.99,
			},
			{
				productId: 10,
				aantal: 120,
				prijs: 120 * 199.99,
			},
		],
	},
	{
		id: 7,
		aankoperId: 5,
		doosId: 4,
		leverAdresId: 4,
		status: 3,
		bestelregels: [
			{
				productId: 13,
				aantal: 260,
				prijs: 260 * 79.99,
			},
			{
				productId: 10,
				aantal: 120,
				prijs: 120 * 199.99,
			},
		],
	},
	{
		id: 8,
		aankoperId: 1,
		leverAdresId: 3,
		status: 0,
		bestelregels: [
			{
				productId: 13,
				aantal: 12,
				prijs: 12 * 79.99,
			},
			{
				productId: 8,
				aantal: 34,
				prijs: 34 * 299.99,
			},
		],
	},
];
