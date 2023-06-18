import express, { Request, Response } from "express";
import trainerService from "../service/trainers";
import { validateMiddleware as validate } from "../utils/middleware";
import { limitOffsetValidator } from "../utils/validator";

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

const trainersRouter = express.Router();
trainersRouter.get("/", limitOffsetValidator, validate, getAllTrainers);

export default trainersRouter;
