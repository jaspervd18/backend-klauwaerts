import { Express } from "express";
import { serve, setup } from "swagger-ui-express";
import openApiJson from "../openapi.json";
import { getLogger } from "./logging";

const swaggerDocs = (app: Express, port: number) => {
  app.use("/api/docs", serve, setup(openApiJson));
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(openApiJson);
  });
  getLogger().info(`Docs available at http://localhost:${port}/api/docs`);
};

export default swaggerDocs;
