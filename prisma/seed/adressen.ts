import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedAdressen() {
  if ((await prisma.adres.count()) > 0) return;
  for (const adres of ADRESSEN) {
    await prisma.adres.create({
      data: {
        id: adres.id,
        straat: adres.straat,
        huisnummer: adres.huisnummer,
        postcode: adres.postcode,
        land: adres.land,
      },
    });
    console.log(`Created adres with id: ${adres.id}`);
  }
}

const ADRESSEN = [
  {
    id: 1,
    straat: "Kerkstraat",
    huisnummer: "1",
    postcode: "1000",
    land: "België",
  },
  {
    id: 2,
    straat: "Tempelstraat",
    huisnummer: "2",
    postcode: "1000",
    land: "België",
  },
  {
    id: 3,
    straat: "Moskeestraat",
    huisnummer: "3",
    postcode: "1000",
    land: "België",
  },
  {
    id: 4,
    straat: "Synagogestraat",
    huisnummer: "4",
    postcode: "1000",
    land: "België",
  },
];
