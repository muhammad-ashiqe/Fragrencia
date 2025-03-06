import express from "express";
import { getDashboardDetails } from "../controllers/dasboardController.js";


const dashRouter = express.Router();

// 📌 GET: Admin Dashboard Data
dashRouter.get("/dashboard", getDashboardDetails);

export default dashRouter;
