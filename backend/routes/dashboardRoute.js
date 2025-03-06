import express from "express";
import {  getDashboardStats } from "../controllers/dasboardController.js";


const dashRouter = express.Router();

// 📌 GET: Admin Dashboard Data
dashRouter.get("/dashboard", getDashboardStats);

export default dashRouter;
