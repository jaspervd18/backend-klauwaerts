import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedProducten() {
	if ((await prisma.product.count()) > 0) return;
	for (const product of PRODUCTEN) {
		await prisma.product.create({
			data: {
				id: product.id,
				naam: product.naam,
				prijs: product.prijs,
				stock: product.stock,
				levertijd: product.levertijd,
				omschrijving: product.omschrijving,
				foto: product.foto,
			},
		});
		console.log(`Created product with id: ${product.id}`);
	}
}

const PRODUCTEN = [
	{
		id: 1,
		naam: "Wireless Earbuds",
		foto: "https://images.unsplash.com/photo-1505236273191-1dce886b01e9",
		omschrijving: "Enjoy high-quality sound with these wireless earbuds",
		prijs: 89.99,
		stock: 10,
		levertijd: 2,
	},
	{
		id: 2,
		naam: "Smartwatch",
		foto: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
		omschrijving: "Stay connected with this stylish smartwatch",
		prijs: 149.99,
		stock: 5,
		levertijd: 3,
	},
	{
		id: 3,
		naam: "Wireless Charger",
		foto: "https://images.unsplash.com/photo-1543472750-506bacbf5808?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		omschrijving: "Charge your devices wirelessly with this convenient charger",
		prijs: 29.99,
		stock: 15,
		levertijd: 1,
	},
	{
		id: 4,
		naam: "Laptop Stand",
		foto: "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
		omschrijving: "Work comfortably with this ergonomic laptop stand",
		prijs: 39.99,
		stock: 20,
		levertijd: 2,
	},
	{
		id: 5,
		naam: "Bluetooth Speaker",
		foto: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
		omschrijving: "Take your music anywhere with this Bluetooth speaker",
		prijs: 59.99,
		stock: 8,
		levertijd: 3,
	},
	{
		id: 6,
		naam: "Wireless Gaming Mouse",
		foto: "https://images.unsplash.com/photo-1619334084350-b093f0a9b40e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		omschrijving:
			"Get the competitive edge with this high-performance gaming mouse",
		prijs: 69.99,
		stock: 12,
		levertijd: 1,
	},
	{
		id: 7,
		naam: "Fitness Tracker",
		foto: "https://images.unsplash.com/photo-1557045136-50ed3874553c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		omschrijving: "Track your fitness goals with this sleek fitness tracker",
		prijs: 99.99,
		stock: 3,
		levertijd: 5,
	},
	{
		id: 8,
		naam: "Virtual Reality Headset",
		foto: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		omschrijving:
			"Experience immersive virtual reality with this high-end headset",
		prijs: 299.99,
		stock: 2,
		levertijd: 7,
	},
	{
		id: 9,
		naam: "Noise-Cancelling Headphones",
		foto: "https://images.unsplash.com/photo-1612478120679-5b7412e15f84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		omschrijving:
			"Block out distractions with these noise-cancelling headphones",
		prijs: 129.99,
		stock: 7,
		levertijd: 4,
	},
	{
		id: 10,
		naam: "Smart Thermostat",
		foto: "https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		omschrijving:
			"Save energy and control your home's temperature with this smart thermostat",
		prijs: 199.99,
		stock: 4,
		levertijd: 3,
	},
	{
		id: 11,
		naam: "USB-C Hub",
		foto: "https://images.unsplash.com/photo-1616578781650-cd818fa41e57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
		omschrijving: "Expand your device's connectivity with this USB-C hub",
		prijs: 49.99,
		stock: 18,
		levertijd: 1,
	},
	{
		id: 12,
		naam: "External Hard Drive",
		foto: "https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		omschrijving: "Store your files safely with this external hard drive",
		prijs: 119.99,
		stock: 6,
		levertijd: 3,
	},
	{
		id: 13,
		naam: "Wireless Keyboard",
		foto: "https://images.unsplash.com/photo-1662830857519-2f9b28e3b4ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
		omschrijving: "Type with ease using this wireless keyboard",
		prijs: 79.99,
		stock: 11,
		levertijd: 2,
	},
	{
		id: 14,
		naam: "Power Bank",
		foto: "https://images.unsplash.com/photo-1632156752398-2b2cb4e6c907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80",
		omschrijving: "Stay charged on the go with this power bank",
		prijs: 49.99,
		stock: 16,
		levertijd: 1,
	},
	{
		id: 15,
		naam: "Gaming Keyboard",
		foto: "https://images.unsplash.com/photo-1633315754878-b5a3b0ce64f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
		omschrijving:
			"Level up your gaming setup with this high-performance keyboard",
		prijs: 89.99,
		stock: 8,
		levertijd: 2,
	},
	{
		id: 16,
		naam: "USB Flash Drive",
		foto: "https://images.unsplash.com/photo-1618324068470-a16be196e98f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
		omschrijving: "Transfer files quickly with this USB flash drive",
		prijs: 14.99,
		stock: 25,
		levertijd: 1,
	},
	{
		id: 17,
		naam: "Smart Doorbell",
		foto: "https://images.unsplash.com/photo-1633194883650-df448a10d554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=676&q=80",
		omschrijving:
			"Know who's at your door from anywhere with this smart doorbell",
		prijs: 149.99,
		stock: 2,
		levertijd: 3,
	},
	{
		id: 18,
		naam: "Smart Lock",
		foto: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
		omschrijving: "Secure your home with this smart lock",
		prijs: 179.99,
		stock: 4,
		levertijd: 3,
	},
];
