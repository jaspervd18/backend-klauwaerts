import express, { Request, Response } from "express";
import dozenService from "../service/dozen";
import { validateMiddleware as validate } from "../utils/middleware";
import { limitOffsetValidator } from "../utils/validator";
import { checkJwtToken } from "../utils/auth";

const getAllDozen = async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      await dozenService.getAll(
        Number(req.query.limit),
        Number(req.query.offset)
      )
    );
};

const dozenRouter = express.Router();
dozenRouter.get("/", checkJwtToken, limitOffsetValidator, validate, getAllDozen);

export default dozenRouter;
