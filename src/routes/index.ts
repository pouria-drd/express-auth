import { Router } from "express";
import appRoutes from "./app.route";
// import authRoutes from "./auth.route"; // future example

const router = Router();

/**
 * Mount sub-routes here
 */
router.use("/", appRoutes);
// router.use("/auth", authRoutes);

export default router;
