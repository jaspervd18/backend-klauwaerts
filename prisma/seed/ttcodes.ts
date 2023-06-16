import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedCodes() {
	if ((await prisma.tTCode.count()) > 0) return;
	for (const tTCode of TTCODES) {
		await prisma.tTCode.create({
			data: {
				id: tTCode.id,
				code: tTCode.code,
				bestellingId: tTCode.bestellingId,
				transportdienstId: tTCode.transportdienstId,
			},
		});
		console.log(`Created tTCode with id: ${tTCode.id}`);
	}
}

const TTCODES = [
	{
		id: 1,
		code: "PNL-0123456789",
		bestellingId: 2,
		transportdienstId: 1,
	},
	{
		id: 2,
		code: "PNL-0123456788",
		bestellingId: 3,
		transportdienstId: 1,
	},
	{
		id: 4,
		code: "UPS-0123456788",
		bestellingId: 5,
		transportdienstId: 3,
	},
	{
		id: 5,
		code: "FDX-0123456787",
		bestellingId: 7,
		transportdienstId: 4,
	},
];
