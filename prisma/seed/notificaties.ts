import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedNotificaties() {
	if ((await prisma.notificatie.count()) > 0) return;
	for (const notificatie of NOTIFICATIES) {
		await prisma.notificatie.create({
			data: {
				id: notificatie.id,
				statusBestelling: notificatie.statusBestelling,
				createdAt: notificatie.createdAt,
				toestand: notificatie.toestand,
				bestellingId: notificatie.bestellingId,
				klantId: notificatie.klantId,
			},
		});
		console.log(`Created notificatie with id: ${notificatie.id}`);
	}
}

const NOTIFICATIES = [
	{
		id: 1,
		toestand: 0,
		createdAt: new Date("2021-05-01T12:00:00.000Z"),
		statusBestelling: 0,
		bestellingId: 1,
		klantId: 1,
	},
	{
		id: 2,
		toestand: 1,
		createdAt: new Date("2021-05-02T12:00:00.000Z"),
		statusBestelling: 1,
		bestellingId: 1,
		klantId: 1,
	},
	{
		id: 3,
		toestand: 2,
		createdAt: new Date("2021-05-03T12:00:00.000Z"),
		statusBestelling: 2,
		bestellingId: 1,
		klantId: 1,
	},
	{
		id: 4,
		toestand: 2,
		createdAt: new Date("2021-05-04T12:00:00.000Z"),
		statusBestelling: 3,
		bestellingId: 1,
		klantId: 1,
	},
	{
		id: 5,
		toestand: 0,
		createdAt: new Date("2021-05-06T12:00:00.000Z"),
		statusBestelling: 0,
		bestellingId: 2,
		klantId: 2,
	},
	{
		id: 6,
		toestand: 0,
		createdAt: new Date("2021-05-07T12:00:00.000Z"),
		statusBestelling: 1,
		bestellingId: 2,
		klantId: 2,
	},
	{
		id: 7,
		toestand: 1,
		createdAt: new Date("2021-05-08T12:00:00.000Z"),
		statusBestelling: 2,
		bestellingId: 2,
		klantId: 2,
	},
	{
		id: 8,
		toestand: 2,
		createdAt: new Date("2021-05-09T12:00:00.000Z"),
		statusBestelling: 3,
		bestellingId: 2,
		klantId: 2,
	},
	{
		id: 9,
		toestand: 0,
		createdAt: new Date("2021-05-05T12:00:00.000Z"),
		statusBestelling: 0,
		bestellingId: 3,
		klantId: 3,
	},
	{
		id: 10,
		toestand: 1,
		createdAt: new Date("2021-05-06T12:00:00.000Z"),
		statusBestelling: 1,
		bestellingId: 3,
		klantId: 3,
	},
	{
		id: 11,
		toestand: 2,
		createdAt: new Date("2021-05-07T12:00:00.000Z"),
		statusBestelling: 2,
		bestellingId: 3,
		klantId: 3,
	},
	{
		id: 12,
		toestand: 2,
		createdAt: new Date("2021-05-08T12:00:00.000Z"),
		statusBestelling: 3,
		bestellingId: 3,
		klantId: 3,
	},
];
