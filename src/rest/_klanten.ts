import express, { Request, Response } from "express";
import { AppError } from "../exception/AppError";
import klantenService from "../service/klanten";
import { checkJwtToken } from "../utils/auth";
import { validateMiddleware as validate } from "../utils/middleware";
import { idValidator } from "../utils/validator";

const getKlantenById = async (req: Request, res: Response) => {
	const klant = await klantenService.getById(Number(req.params.id));
	if (klant) res.status(200).json(klant);
	else throw new AppError(404, `Aankoper ${req.params.id} not found!`);
};

const klantenRouter = express.Router();
klantenRouter.get("/:id", checkJwtToken, idValidator, validate, getKlantenById);

export default klantenRouter;
