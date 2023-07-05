import { body, param, query } from "express-validator";

const idValidator = [
  param("id", "Id must be a positive int").isInt({ min: 0 }),
];

const limitOffsetValidator = [
  query("limit", "Limit must be int between 0 and 100").default(100).isInt({
    min: 0,
    max: 100,
  }),
  query("offset", "Offset must be a positive int").default(0).isInt({ min: 0 }),
];

const updateEventValidator = [
  body("title", "Title is required").isString(),
  body("start", "Start of event is required").isString(),
  body("end", "End of event is required").isString(),
];

const newEventValidator = [...updateEventValidator];

const updateCompetitionValidator = [
  body("type", "Type is required").isString(),
  body("title", "Title is required").isString(),
  body("day", "Day of event is required").isString(),
];

const newCompetitionValidator = [...updateCompetitionValidator];

export {
  idValidator,
  limitOffsetValidator,
  updateEventValidator,
  newEventValidator,
  updateCompetitionValidator,
  newCompetitionValidator,
};
