import { ErrorStatusMap, ErrorType, IError, IErrorResponse } from "@/types";

class AppError<T = unknown> extends Error implements IError<T> {
	public readonly type: ErrorType;
	public readonly statusCode: number;
	public readonly details?: T;

	constructor(type: ErrorType, message: string, details?: T) {
		super(message);
		this.name = "AppError";
		this.type = type;
		this.statusCode = ErrorStatusMap[type];
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}

	// Factory methods for cleaner usage
	static BadRequest<T = unknown>(msg: string, details?: T) {
		return new AppError<T>("BadRequest", msg, details);
	}

	static Unauthorized(msg: string, details?: unknown) {
		return new AppError("Unauthorized", msg, details);
	}

	static Forbidden(msg: string, details?: unknown) {
		return new AppError("Forbidden", msg, details);
	}

	static NotFound(msg: string, details?: unknown) {
		return new AppError("NotFound", msg, details);
	}

	static Conflict(msg: string, details?: unknown) {
		return new AppError("Conflict", msg, details);
	}

	static Internal(msg: string, details?: unknown) {
		return new AppError("Internal", msg, details);
	}

	static TooManyRequests(msg: string, details?: unknown) {
		return new AppError("TooManyRequests", msg, details);
	}

	toJSON(): IErrorResponse<T> {
		return {
			success: false,
			message: this.message,
			error: {
				type: this.type,
				statusCode: this.statusCode,
				details: this.details,
			},
		};
	}
}

export default AppError;
