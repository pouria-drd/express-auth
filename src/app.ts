import path from "path";
import cors from "cors";
import express from "express";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";

import router from "@/routes";
import ENV from "@/configs/env.config";
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
app.use(ENV.BASE_API_ROUTE, router);

/* -----------------------------------------------------------
 * ❌  Global Error Handlers
 * ----------------------------------------------------------- */
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
