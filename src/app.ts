import path from "path";
import cors from "cors";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";

import ENV from "@/configs/env.config";
import { getAppVersion } from "@/lib/utils";

const app = express();

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
 * Root route (health check / info endpoint)
 * Returns basic app info and version.
 */
app.get("/", (req: Request, res: Response) => {
	res.json({
		success: true,
		name: "Chat Server",
		version: getAppVersion(),
		message: "Welcome to the chat server!",
	});
});

/* -----------------------------------------------------------
 * ❌  Global Error Handler
 * ----------------------------------------------------------- */

/**
 * Handles all errors thrown from routes or middleware.
 * Must be the last middleware in the chain.
 */
// app.use(errorMiddleware);

export default app;
