import express, { Request, Response } from "express";
import { AppError } from "../exception/AppError";
import bestellingService from "../service/bestellingen";
import klantenService from "../service/klanten";
import notificatieService from "../service/notificaties";
import { checkJwtToken } from "../utils/auth";
import { validateMiddleware as validate } from "../utils/middleware";
import {
	idValidator,
	limitOffsetValidator,
	newBestellingValidator,
	ttCodeValidator,
	updateBestellingValidator,
} from "../utils/validator";

const getBestellingById = async (req: Request, res: Response) => {
	const bestelling = await bestellingService.getById(Number(req.params.id));
	if (!bestelling)
		throw new AppError(404, `Bestelling ${req.params.id} not found!`);
	res.status(200).json(bestelling);
};

const getBestellingByTTcode = async (req: Request, res: Response) => {
	const bestelling = await bestellingService.getById(Number(req.params.id));
	if (!bestelling)
		throw new AppError(404, `Bestelling ${req.params.id} not found!`);
	if (bestelling.trackAndTrace?.code !== req.params.ttcode)
		throw new AppError(401, `Invalid trackAndTrace code!`);
	res.status(200).json(bestelling);
};

const createBestelling = async (req: Request, res: Response) => {
	const bestelling = await bestellingService.create(req.body);
	notificatieService.create(bestelling.id, bestelling.aankoperId);
	res.status(201).json(bestelling);
};

const updateBestellingById = async (req: Request, res: Response) => {
	const bestelling = await bestellingService.updateById(
		Number(req.params.id),
		req.body
	);
	if (!bestelling)
		throw new AppError(404, `Bestelling ${Number(req.params.id)} not found`);
	res.status(200).json(bestelling);
};

const getBestellingenByKlantId = async (req: Request, res: Response) => {
	const bestellingen = await klantenService.getBestellingenByKlantId(
		Number(req.params.id),
		Number(req.query.limit),
		Number(req.query.offset)
	);
	if (bestellingen) res.status(200).json(bestellingen);
	else
		throw new AppError(
			404,
			`Bestellingen for Klant ${req.params.id} not found!`
		);
};

const bestellingenRouter = express.Router();
bestellingenRouter
	.get(
		"/klanten/:id",
		checkJwtToken,
		idValidator,
		limitOffsetValidator,
		validate,
		getBestellingenByKlantId
	)
	.get("/:id", checkJwtToken, idValidator, validate, getBestellingById)
	.get(
		"/:id/:ttcode",
		ttCodeValidator,
		idValidator,
		validate,
		getBestellingByTTcode
	)
	.post("/", checkJwtToken, newBestellingValidator, validate, createBestelling)
	.put(
		"/:id",
		checkJwtToken,
		updateBestellingValidator,
		idValidator,
		validate,
		updateBestellingById
	);

export default bestellingenRouter;
