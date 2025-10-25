import path from "path";
import cors from "cors";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";

import ENV from "@/configs/env.config";
import { errorMiddleware, httpLogger, notFoundMiddleware } from "@/middlewares";
import { getAppInfo } from "./controllers/app.controller";

const app = express();

app.use(httpLogger);

//  Serve favicon before other middleware
app.use(favicon(path.join(process.cwd(), "public", "favicon.ico")));

app.use(
	cors({
		origin: ENV.CORS_ORIGIN,
		credentials: true,
	}),
);

app.use(express.json({ limit: ENV.JSON_LIMIT_STRING }));

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* -----------------------------------------------------------
 * 🚏  Routes
 * ----------------------------------------------------------- */

/**
 * Mount all application routes under `/api`
 * Example: /api/auth, /api/users, /api/posts
 */
// app.use("/api", router);

/**
 * Returns basic app info and version.
 */
app.get("/", getAppInfo);

/* -----------------------------------------------------------
 * ❌  Global Error Handler
 * ----------------------------------------------------------- */

app.use(notFoundMiddleware); // 404 handler
app.use(errorMiddleware); // global error handler

export default app;
