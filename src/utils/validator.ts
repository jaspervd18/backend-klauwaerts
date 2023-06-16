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
  body("start", "Start of event is required").isDate(),
  body("end", "End of event is required").isDate(),
];

const newEventValidator = [
  ...updateEventValidator,
  //   body("aankoperId", "AankoperId must be positive int").isInt({ min: 0 }),
  //   body("bestelregels", "Bestelregels must be Array").isArray(),
  //   body("bestelregels.*.productId", "ProductId must be positive int").isInt({
  //     min: 0,
  //   }),
  //   body("bestelregels.*.aantal", "Aantal must be atleast 1").isInt({ min: 1 }),
  //   body("bestelregels.*.prijs", "Prijs must be positive int").isFloat({
  //     min: 0,
  //   }),
];

export {
  idValidator,
  limitOffsetValidator,
  updateEventValidator,
  newEventValidator,
};
