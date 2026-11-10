import express from "express";
import pageController from "../controllers/pageController.js";

// A Router is a "mini Express app" that holds a related group of routes
const router = express.Router();

// Test: GET http://localhost:3000/
router.get("/", pageController.showHome);

// Test: GET http://localhost:3000/services
router.get("/services", pageController.showServices);

export default router;
