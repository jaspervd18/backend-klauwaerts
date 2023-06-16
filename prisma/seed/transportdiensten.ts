import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedTransportdiensten() {
	if ((await prisma.transportdienst.count()) > 0) return;
	for (const transportdienst of TRANSPORTDIENSTEN) {
		await prisma.transportdienst.create({
			data: {
				id: transportdienst.id,
				naam: transportdienst.naam,
				actief: transportdienst.actief,
				prefix: transportdienst.prefix,
			},
		});
		console.log(`Created transportdienst with id: ${transportdienst.id}`);
	}
}

const TRANSPORTDIENSTEN = [
	{ id: 1, naam: "PostNL", actief: true, prefix: "PNL" },
	{ id: 2, naam: "DHL", actief: true, prefix: "DHL" },
	{ id: 3, naam: "UPS", actief: true, prefix: "UPS" },
	{ id: 4, naam: "FedEx", actief: false, prefix: "FDX" },
];
