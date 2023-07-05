import express, { Request, Response } from "express";
import { AppError } from "../exception/AppError";
import competitionService from "../service/competitions";
import { validateMiddleware as validate } from "../utils/middleware";
import {
  idValidator,
  limitOffsetValidator,
  newCompetitionValidator,
  updateCompetitionValidator,
} from "../utils/validator";

const getAllCompetitions = async (req: Request, res: Response) => {
  const month = Number(req.query.month) || new Date().getMonth() + 1;
  const year = Number(req.query.year) || new Date().getFullYear();
  res.status(200).json(await competitionService.getAll(month, year));
};

const getCompetitionById = async (req: Request, res: Response) => {
  const competition = await competitionService.getById(Number(req.params.id));
  if (!competition)
    throw new AppError(404, `competition ${req.params.id} not found!`);
  res.status(200).json(competition);
};

const createCompetition = async (req: Request, res: Response) => {
  const competition = await competitionService.create(req.body);
  res.status(201).json(competition);
};

const updateCompetitionById = async (req: Request, res: Response) => {
  const competition = await competitionService.updateById(
    Number(req.params.id),
    req.body
  );
  if (!competition)
    throw new AppError(404, `Competition ${Number(req.params.id)} not found`);
  res.status(200).json(competition);
};

const deleteCompetitionById = async (req: Request, res: Response) => {
  const competition = await competitionService.deleteById(
    Number(req.params.id)
  );
  if (!competition)
    throw new AppError(404, `Competition ${Number(req.params.id)} not found`);
  res.status(200).json(competition);
};

const competitionsRouter = express.Router();
competitionsRouter
  .get("/", limitOffsetValidator, validate, getAllCompetitions)
  .get("/:id", idValidator, validate, getCompetitionById)
  .post("/", newCompetitionValidator, validate, createCompetition)
  .put(
    "/:id",
    updateCompetitionValidator,
    idValidator,
    validate,
    updateCompetitionById
  )
  .delete("/:id", idValidator, validate, deleteCompetitionById);

export default competitionsRouter;
