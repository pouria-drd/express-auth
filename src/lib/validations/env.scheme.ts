import { z } from "zod";

// Define a string pattern for durations like "15m", "7d", etc.
const stringValue = z.string().regex(/^\d+(s|m|h|d|y)$/, {
	error: "Invalid time format — expected something like '15m' or '7d'.",
});

const envSchema = z.object({
	// Server
	DB_URI: z.string().min(1, { error: "DB_URI is required" }),
	PORT: z
		.string()
		.default("5500")
		.transform(Number)
		.refine((val) => val > 0 && val < 65536, {
			error: "PORT must be a number between 1 and 65535",
		}),

	BASE_API_ROUTE: z
		.string()
		.regex(
			/^\/[a-zA-Z0-9/_-]*$/,
			"Must start with '/' and contain valid path characters",
		)
		.default("/api")
		.transform((val) => val.replace(/\/+$/, "")), // remove trailing slash

	NODE_ENV: z.enum(["development", "production"]).default("development"),

	// Uploads
	JSON_LIMIT: z
		.string()
		.default("2")
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val) && val > 0, {
			error: "JSON_LIMIT must be a number greater than 0",
		}),
	MAX_IMAGE_SIZE: z
		.string()
		.default("2")
		.transform((val) => Number(val) * 1024 * 1024)
		.refine((val) => val > 0, {
			error: "MAX_IMAGE_SIZE must be a number greater than 0",
		}),

	// CORS
	CORS_ORIGIN: z
		.string()
		.default("*")
		.transform((val) => val.split(",").map((v) => v.trim())),

	// JWT
	TOKEN_NAME: z.string().default("session"),
	JWT_SECRET: z.string().min(1, { error: "JWT_SECRET is required" }),
	JWT_EXPIRES_IN: stringValue.default("1d"),
});

export default envSchema;
