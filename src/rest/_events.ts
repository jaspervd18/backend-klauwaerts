import express, { Request, Response } from "express";
import { AppError } from "../exception/AppError";
import eventService from "../service/events";
import { validateMiddleware as validate } from "../utils/middleware";
import {
  idValidator,
  limitOffsetValidator,
  newEventValidator,
  updateEventValidator,
} from "../utils/validator";

const getAllEvents = async (req: Request, res: Response) => {
  const month = Number(req.query.month) || new Date().getMonth() + 1;
  const year = Number(req.query.year) || new Date().getFullYear();
  res.status(200).json(await eventService.getAll(month, year));
};

const getEventById = async (req: Request, res: Response) => {
  const event = await eventService.getById(Number(req.params.id));
  if (!event) throw new AppError(404, `Event ${req.params.id} not found!`);
  res.status(200).json(event);
};

const createEvent = async (req: Request, res: Response) => {
  const event = await eventService.create(req.body);
  res.status(201).json(event);
};

const updateEventById = async (req: Request, res: Response) => {
  const event = await eventService.updateById(Number(req.params.id), req.body);
  if (!event)
    throw new AppError(404, `Event ${Number(req.params.id)} not found`);
  res.status(200).json(event);
};

const deleteEventById = async (req: Request, res: Response) => {
  const event = await eventService.deleteById(Number(req.params.id));
  if (!event)
    throw new AppError(404, `Event ${Number(req.params.id)} not found`);
  res.status(200).json(event);
};

const eventsRouter = express.Router();
eventsRouter
  .get("/", limitOffsetValidator, validate, getAllEvents)
  .get("/:id", idValidator, validate, getEventById)
  .post("/", newEventValidator, validate, createEvent)
  .put("/:id", updateEventValidator, idValidator, validate, updateEventById)
  .delete("/:id", idValidator, validate, deleteEventById);

export default eventsRouter;
