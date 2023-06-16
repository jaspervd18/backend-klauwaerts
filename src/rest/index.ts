import type { Express } from "express";
import { getLogger } from "../utils/logging";
import aankopersRouter from "./_aankopers";
import bestellingenRouter from "./_bestellingen";
import dozenRouter from "./_dozen";
import klantenRouter from "./_klanten";
import productenRouter from "./_producten";
import notificatiesRouter from "./_notificaties";
import loginRouter from "./_auth";

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
  app.use("/api/aankopers", aankopersRouter);
  app.use("/api/klanten", klantenRouter);
  app.use("/api/bestellingen", bestellingenRouter);
  app.use("/api/dozen", dozenRouter);
  app.use("/api/producten", productenRouter);
  app.use("/api/notificaties", notificatiesRouter);
  app.use("/api/login", loginRouter);
  getLogger().debug("API endpoints setup");
}
