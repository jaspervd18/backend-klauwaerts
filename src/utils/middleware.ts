import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../exception/AppError";
import { getLogger } from "./logging";

const logMiddleware = (req: Request, _: Response, next: NextFunction) => {
	getLogger().info(`${req.method} ${req.url}`);
	next();
};

const validateMiddleware = (req: Request, _: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) return next();
	throw new AppError(400, errors.array()[0].msg);
};

const errorMiddleware = (
	err: Error,
	_: Request,
	res: Response,
	next: NextFunction
) => {
	let code = 500;
	if (err instanceof AppError) code = err.httpCode;
	let message = err.message || "Internal Server Error";
	const msgArray = err.message.split("\n").filter((str) => str !== "");
	if (msgArray.length > 2) message = msgArray[msgArray.length - 1];
	res.status(code).json({ error: { code, message } });
	getLogger().error(`${code} ${err.message}`);
	next();
};

export { errorMiddleware, logMiddleware, validateMiddleware };
