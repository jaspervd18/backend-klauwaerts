import express, { Request, Response } from "express";
import { AppError } from "../exception/AppError";
import aankopersService from "../service/aankopers";
import { generateToken } from "../utils/jwt";
import { validateMiddleware as validate } from "../utils/middleware";
import { verifyPassword } from "../utils/password";
import { loginValidator } from "../utils/validator";

const loginAankoper = async (email: string, wachtwoord: string) => {
	const aankoper = await aankopersService.getByEmail(email);
	if (!aankoper) {
		console.log("Invalid login credentials");
		throw new AppError(401, "Invalid login credentials");
	}
	const isPasswordValid = await verifyPassword(wachtwoord, aankoper.wachtwoord);
	if (!isPasswordValid) {
		console.log("Invalid login credentials");
		throw new AppError(401, "Invalid login credentials");
	}
	const token = generateToken(aankoper.id, aankoper.email);

	console.log("token", token);

	return token;
};

const getToken = async (req: Request, res: Response) => {
	const { email, wachtwoord } = req.body;
	try {
		const token = await loginAankoper(email, wachtwoord);
		res.status(200).json({ token });
	} catch (error) {
		throw new AppError(401, "Invalid login credentials");
	}
};

const loginRouter = express.Router();

loginRouter.post("/", loginValidator, validate, getToken);

export default loginRouter;
