import AppError from "@/errors/app.error";
import packageJson from "../../../package.json";
import { Request, Response } from "express";

/**
 * Get the current application version.
 * @returns The current application version.
 */
function getAppVersion(): string {
	return packageJson.version || "0.1.0";
}

/**
 * Check if the given error is an instance of AppError.
 * @param error The error to check.
 * @returns True if the error is an instance of AppError, false otherwise.
 */
function isAppError(error: unknown): error is AppError {
	return error instanceof AppError;
}

/**
 * Send a response with a success message and optional data.
 * @param res - The response object.
 * @param status - The HTTP status code.
 * @param message - The success message.
 * @param data - Optional data to be sent with the response.
 */
function sendResponse(
	res: Response,
	status: number,
	message: string,
	data = {},
) {
	res.status(status).json({ success: true, message, data });
}

export { getAppVersion, isAppError, sendResponse };
