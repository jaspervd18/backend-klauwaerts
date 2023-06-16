import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedDozen() {
	if ((await prisma.doos.count()) > 0) return;
	for (const doos of DOZEN) {
		await prisma.doos.create({
			data: {
				id: doos.id,
				actief: doos.actief,
				breedte: doos.breedte,
				hoogte: doos.hoogte,
				lengte: doos.lengte,
				naam: doos.naam,
				prijs: doos.prijs,
				type: doos.type,
			},
		});
		console.log(`Created doos with id: ${doos.id}`);
	}
}

const DOZEN = [
	{
		id: 1,
		actief: true,
		breedte: 20,
		hoogte: 10,
		lengte: 30,
		naam: 'Klein',
		prijs: 10.0,
		type: 0,
	},
	{
		id: 2,
		actief: true,
		breedte: 15,
		hoogte: 12,
		lengte: 25,
		naam: 'Middel',
		prijs: 8.5,
		type: 0,
	},
	{
		id: 3,
		actief: true,
		breedte: 40,
		hoogte: 30,
		lengte: 60,
		naam: 'Groot',
		prijs: 20.0,
		type: 0,
	},
	{
		id: 4,
		actief: true,
		breedte: 25,
		hoogte: 20,
		lengte: 35,
		naam: 'Ecologisch klein',
		prijs: 15.0,
		type: 1,
	},
	{
		id: 5,
		actief: true,
		breedte: 50,
		hoogte: 40,
		lengte: 70,
		naam: 'Ecologisch Groot',
		prijs: 30.0,
		type: 1,
	},
];
