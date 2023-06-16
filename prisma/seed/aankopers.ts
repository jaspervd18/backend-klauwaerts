import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../src/utils/password';
const prisma = new PrismaClient();

export default async function seedAankopers() {
	if ((await prisma.aankoper.count()) > 0) return;
	for (const aankoper of AANKOPERS) {
		await prisma.aankoper.create({
			data: {
				id: aankoper.id,
				naam: aankoper.naam,
				voornaam: aankoper.voornaam,
				email: aankoper.email,
				klantId: aankoper.klantId,
				wachtwoord: await hashPassword(aankoper.wachtwoord),
			},
		});
		console.log(`Created aankoper with id: ${aankoper.id}`);
	}
}

const AANKOPERS = [
	{
		id: 1,
		naam: 'Janssens',
		voornaam: 'Jan',
		email: 'jan.janssens@example.com',
		klantId: 1,
		wachtwoord: 'Jan123',
	},
	{
		id: 2,
		naam: 'Peeters',
		voornaam: 'Piet',
		email: 'piet.peeters@example.com',
		klantId: 2,
		wachtwoord: 'Piet123',
	},
	{
		id: 3,
		naam: 'Vermeulen',
		voornaam: 'Eva',
		email: 'eva.vermeulen@example.com',
		klantId: 3,
		wachtwoord: 'Eva123',
	},
	{
		id: 4,
		naam: 'Vandenberghe',
		voornaam: 'Bart',
		email: 'bart.vandenberghe@example.com',
		klantId: 4,
		wachtwoord: 'Bart123',
	},
	{
		id: 5,
		naam: 'Jacobs',
		voornaam: 'Sarah',
		email: 'sarah.jacobs@example.com',
		klantId: 1,
		wachtwoord: 'Sarah123',
	},
];
