import type { Express } from "express";
import { getLogger } from "../utils/logging";
import eventsRouter from "./_events";
import trainersRouter from "./_trainers";

export function installRestRouter(app: Express) {
  /**
   * @openapi
   * /api/health:
   *   get:
   *     tags:
   *       - Health
   *     description: Health check
   */
  app.get("/api/health", (req, res) => {
    getLogger().info("Health check OK");
    return res.status(200).send("OK");
  });
  app.use("/api/events", eventsRouter);
  app.use("/api/trainers", trainersRouter);
  getLogger().debug("API endpoints setup");
}
