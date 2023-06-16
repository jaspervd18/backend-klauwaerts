import express, { Request, Response } from "express";
import { AppError } from "../exception/AppError";
import productenService from "../service/producten";
import { validateMiddleware as validate } from "../utils/middleware";
import { idValidator, pageValidator } from "../utils/validator";

const getAllProducten = async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	res.status(200).json(await productenService.getAll(page));
};

const getProductById = async (req: Request, res: Response) => {
	const product = await productenService.getById(Number(req.params.id));
	if (product) res.status(200).json(product);
	else throw new AppError(404, `Product ${req.params.id} not found!`);
};

const productenRouter = express.Router();
productenRouter
	.get("/", pageValidator, validate, getAllProducten)
	.get("/:id", idValidator, validate, getProductById);

export default productenRouter;
