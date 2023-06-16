import express, { Request, Response } from "express";
import { AppError } from "../exception/AppError";
import aankopersService from "../service/aankopers";
import { validateMiddleware as validate } from "../utils/middleware";
import { idValidator } from "../utils/validator";
import { checkJwtToken } from "../utils/auth";

const getAankoperById = async (req: Request, res: Response) => {
  const aankoper = await aankopersService.getById(Number(req.params.id));
  if (aankoper) res.status(200).json(aankoper);
  else throw new AppError(404, `Aankoper ${req.params.id} not found!`);
};

const aankopersRouter = express.Router();
aankopersRouter.get("/:id", checkJwtToken, idValidator, validate, getAankoperById);

export default aankopersRouter;
