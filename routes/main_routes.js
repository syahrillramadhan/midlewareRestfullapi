import express from "express";
import userRoutes from "./users_routes.js";
import moviesRoutes from "./movies_routes.js";
import Auth from "../middlewares/auth.js";
const router = express.Router();

router.use("/api", userRoutes);
router.use(Auth.authentication);
router.use("/api", moviesRoutes);

export default router;
