import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wrap async controllers to automatically forward errors to errorMiddleware
 */
const asyncHandler =
	(fn: RequestHandler) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};

export default asyncHandler;
