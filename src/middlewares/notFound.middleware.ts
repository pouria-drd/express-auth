import AppError from "@/errors/app.error";
import { Request, Response, NextFunction } from "express";

async function notFoundMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	next(AppError.NotFound(`Route ${req.originalUrl} not found`));
}

export default notFoundMiddleware;
