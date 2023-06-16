import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedKlanten() {
	if ((await prisma.klant.count()) > 0) return;
	for (const klant of KLANTEN) {
		await prisma.klant.create({
			data: {
				id: klant.id,
				adresId: klant.adresId,
				gsm: klant.gsm,
				naam: klant.naam,
				logo: klant.logo,
			},
		});
		console.log(`Created klant with id: ${klant.id}`);
	}
}

const KLANTEN = [
	{
		id: 1,
		adresId: 1,
		gsm: '0475/123456',
		naam: 'In The Pocket',
		logo:
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsandbox.vrt.be%2Fin-the-pocket&psig=AOvVaw2oSH9FkpcXYYI_cR9ZQhDx&ust=1682423096986000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLCuzci4wv4CFQAAAAAdAAAAABAE',
	},
	{
		id: 2,
		adresId: 2,
		gsm: '0475/123456',
		naam: 'Cegeka',
		logo:
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gimv.com%2Fnl%2Fportfolio%2Fsmart-industries%2Fcegeka&psig=AOvVaw2e-RGIln66M85pzsyxtzYJ&ust=1682423151849000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIDIz-K4wv4CFQAAAAAdAAAAABAE',
	},
	{
		id: 3,
		adresId: 3,
		gsm: '0475/123456',
		naam: 'Allphi',
		logo:
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.allphi.eu%2Fcontact%2F&psig=AOvVaw2iCVb-_nk7uxUoZ84aJqOV&ust=1682423193860000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiT1va4wv4CFQAAAAAdAAAAABAH',
	},
	{
		id: 4,
		adresId: 4,
		gsm: '0475/123456',
		naam: 'Orbid',
		logo:
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcareers.orbid.be%2Fo%2Fservice-line-manager-security&psig=AOvVaw2eOwNLaWnbtJ5vjkqv0lJA&ust=1682423236530000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPif_oq5wv4CFQAAAAAdAAAAABAE',
	},
];
