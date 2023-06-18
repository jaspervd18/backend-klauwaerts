import express, { Request, Response } from "express";
import trainerService from "../service/trainers";
import { validateMiddleware as validate } from "../utils/middleware";
import { idValidator, limitOffsetValidator } from "../utils/validator";
import { AppError } from "../exception/AppError";

const getAllTrainers = async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      await trainerService.getAll(
        Number(req.query.limit),
        Number(req.query.offset)
      )
    );
};

const getTrainerById = async (req: Request, res: Response) => {
  const event = await trainerService.getById(Number(req.params.id));
  if (!event) throw new AppError(404, `Trainer ${req.params.id} not found!`);
  res.status(200).json(event);
};

const trainersRouter = express.Router();
trainersRouter.get("/", limitOffsetValidator, validate, getAllTrainers);
trainersRouter.get("/:id", idValidator, validate, getTrainerById);

export default trainersRouter;
