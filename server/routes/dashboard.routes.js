import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { dashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/data", isLoggedIn, dashboardData);

export default router;
