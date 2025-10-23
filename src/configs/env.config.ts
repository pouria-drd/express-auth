import path from "path";
import dotenv from "dotenv";

import logger from "./logger.config";
import { envSchema } from "@/lib/validations";

// Load correct .env file based on NODE_ENV
dotenv.config({
	path: path.resolve(
		process.cwd(),
		`.env.${process.env.NODE_ENV || "development"}.local`,
	),
});

// Validate and parse
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	for (const issue of parsed.error.issues) {
		const key = issue.path.join(".");
		logger.error(`❌ ${key}: ${issue.message}`);
	}

	process.exit(1);
}

logger.info(
	`✅ Environment variables are valid, mode: ${process.env.NODE_ENV}`,
);

export const ENV = {
	...parsed.data,
	JSON_LIMIT_STRING: `${parsed.data.JSON_LIMIT}mb`,
};

export default ENV;
