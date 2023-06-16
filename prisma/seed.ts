import { PrismaClient } from "@prisma/client";
import seedAankopers from "./seed/aankopers";
import seedAdressen from "./seed/adressen";
import seedBestellingen from "./seed/bestellingen";
import seedDozen from "./seed/dozen";
import seedKlanten from "./seed/klanten";
import seedNotificaties from "./seed/notificaties";
import seedProducten from "./seed/producten";
import seedTransportdiensten from "./seed/transportdiensten";
import seedCodes from "./seed/ttcodes";
const prisma = new PrismaClient();

async function main() {
	await seedAdressen();
	await seedKlanten();
	await seedAankopers();
	await seedDozen();
	await seedProducten();
	await seedTransportdiensten();
	await seedBestellingen();
	await seedNotificaties();
	await seedCodes();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
