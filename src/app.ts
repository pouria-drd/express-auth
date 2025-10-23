import path from "path";
import cors from "cors";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";

import ENV from "@/configs/env.config";
import { getAppVersion } from "@/lib/utils";
import { errorMiddleware, httpLogger, notFoundMiddleware } from "@/middlewares";

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
 * Root route (health check / info endpoint)
 * Returns basic app info and version.
 */
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		name: "Auth Server",
		version: getAppVersion(),
		message: "Welcome to the Auth Server API!",
		data: {
			ip: req.ip,
			hostname: req.hostname,
			protocol: req.protocol,
			method: req.method,
			url: req.url,
			path: req.path,
		},
	});
});

/* -----------------------------------------------------------
 * ❌  Global Error Handler
 * ----------------------------------------------------------- */

app.use(notFoundMiddleware); // 404 handler
app.use(errorMiddleware); // global error handler

export default app;
