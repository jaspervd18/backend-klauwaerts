import { body, param, query } from "express-validator";

const idValidator = [
	param("id", "Id must be a positive int").isInt({ min: 0 }),
];

const limitOffsetValidator = [
	query("limit", "Limit must be int between 0 and 100").default(100).isInt({
		min: 0,
		max: 100,
	}),
	query("offset", "Offset must be a positive int").default(0).isInt({ min: 0 }),
];

const updateBestellingValidator = [
	body("doosId", "DoosId must be positive int").default(0).isInt({ min: 0 }),
	body("huisnummer", "Huisnummer is required").isString(),
	body("land", "Land is required").isString(),
	body("postcode", "Postcode is required").isString(),
	body("straat", "Straat is required").isString(),
];

const newBestellingValidator = [
	...updateBestellingValidator,
	body("aankoperId", "AankoperId must be positive int").isInt({ min: 0 }),
	body("bestelregels", "Bestelregels must be Array").isArray(),
	body("bestelregels.*.productId", "ProductId must be positive int").isInt({
		min: 0,
	}),
	body("bestelregels.*.aantal", "Aantal must be atleast 1").isInt({ min: 1 }),
	body("bestelregels.*.prijs", "Prijs must be positive int").isFloat({
		min: 0,
	}),
];

const loginValidator = [
	body("email", "Password is required").isEmail(),
	body("wachtwoord", "Password is required").notEmpty(),
];

const pageValidator = [
	query("page", "Page must be a positive int").default(0).isInt({ min: 0 }),
];

const ttCodeValidator = [
	param("ttcode", "Track & Trace Code must be a string").isString(),
];
export {
	idValidator,
	limitOffsetValidator,
	loginValidator,
	newBestellingValidator,
	pageValidator,
	ttCodeValidator,
	updateBestellingValidator,
};
