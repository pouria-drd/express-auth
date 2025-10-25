import { Router } from "express";
import { getAppInfo, getAppHealth } from "@/controllers/app.controller";

const appRouter = Router();

/**
 * @route GET /
 * @desc Returns basic app information
 */
appRouter.get("/", getAppInfo);

/**
 * @route GET /health
 * @desc Returns server and database health status
 */
appRouter.get("/health", getAppHealth);

export default appRouter;
