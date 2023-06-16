import cors from "cors";
import express from "express";
import "express-async-errors";
import { installRestRouter } from "./rest";
import { errorMiddleware, logMiddleware } from "./utils/middleware";

const app = express();
app.use(express.json());
// app.use(
// 	cors({
// 		origin: process.env.CORS_ORIGIN || "http://localhost:4000",
// 		optionsSuccessStatus: 200,
// 		maxAge: parseInt(process.env.CORS_MAX_AGE as string, 10) || 86400,
// 		allowedHeaders: ["Accept", "Content-Type", "Authorization"],
// 	})
// );

app.use(logMiddleware);
installRestRouter(app);
app.use(errorMiddleware);

export default app;
