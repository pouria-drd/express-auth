import { getAppVersion, sendResponse } from "@/lib/utils";
import { Request, Response } from "express";

async function getAppInfo(req: Request, res: Response) {
	sendResponse(res, 200, "Welcome to the Auth Server API!", {
		method: req.method,
		name: "Auth Server API",
		version: getAppVersion(),
	});
}

export { getAppInfo };
