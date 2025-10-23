import { Request, Response, NextFunction } from "express";

import { logger } from "@/configs";
import AppError from "@/errors/app.error";
import { isAppError } from "@/lib/utils";

async function errorMiddleware(
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	let appError: AppError;

	if (isAppError(error)) {
		appError = error;
	} else {
		appError = AppError.Internal("Internal Server Error");
	}

	// Structured logging
	logger.error({
		message: appError.message,
		stack: error instanceof Error ? error.stack : undefined,
		path: req.path,
		method: req.method,
		body: req.body,
		query: req.query,
	});

	// Response
	const response = appError.toJSON();

	// Include stack trace in development
	if (process.env.NODE_ENV === "development" && error instanceof Error) {
		(response.error as any).stack = error.stack;
	}

	res.status(appError.statusCode).json(response);
}

export default errorMiddleware;
