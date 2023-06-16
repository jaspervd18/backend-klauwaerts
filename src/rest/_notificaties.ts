import express, { Request, Response } from "express";
import { AppError } from "../exception/AppError";
import klantenService from "../service/klanten";
import notificatiesService from "../service/notificaties";
import { checkJwtToken } from "../utils/auth";
import { validateMiddleware as validate } from "../utils/middleware";
import { idValidator, limitOffsetValidator } from "../utils/validator";

const updateNotificatieById = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const { toestand } = req.body;
	const notificatie = await notificatiesService.updateById(id, {
		toestand,
	});
	if (!notificatie) throw new AppError(404, `Notificatie ${id} not found`);
	res.status(200).json(notificatie);
};

const getNotificatiesByKlantId = async (req: Request, res: Response) => {
	const notificaties = await klantenService.getNotificatiesByKlantId(
		Number(req.params.id),
		Number(req.query.limit),
		Number(req.query.offset)
	);
	if (notificaties.length > 0) res.status(200).json(notificaties);
	else
		throw new AppError(
			404,
			`Notificaties for Klant ${req.params.id} not found!`
		);
};

const notificatiesRouter = express.Router();
notificatiesRouter
	.put("/:id", checkJwtToken, idValidator, validate, updateNotificatieById)
	.get(
		"/klanten/:id",
		checkJwtToken,
		idValidator,
		limitOffsetValidator,
		validate,
		getNotificatiesByKlantId
	);

export default notificatiesRouter;
