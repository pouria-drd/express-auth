import { Request, Response } from "express";
import { checkMongoConnection, getAppVersion, sendResponse } from "@/lib/utils";

/**
 * Returns basic app info and version.
 */
async function getAppInfo(req: Request, res: Response) {
	sendResponse(res, 200, "Welcome to the Auth Server API!", {
		method: req.method,
		name: "Auth Server API",
		version: getAppVersion(),
	});
}

/**
 * Returns the current app health status.
 * Includes server uptime, version, timestamp, and database connectivity.
 */
async function getAppHealth(req: Request, res: Response) {
	const dbStatus = await checkMongoConnection();

	const health = {
		status: dbStatus === "ok" ? "healthy" : "degraded",
		uptime: process.uptime().toFixed(0) + "s",
		version: getAppVersion(),
		timestamp: new Date().toISOString(),
		checks: {
			server: "ok",
			database: dbStatus,
		},
	};

	sendResponse(res, 200, "Server health check successful", health);
}

export { getAppInfo, getAppHealth };
