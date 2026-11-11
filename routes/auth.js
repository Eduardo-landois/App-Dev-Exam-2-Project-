import express from "express";
import authController from "../controllers/authController.js";

// A Router is a "mini Express app" that holds a related group of routes
const router = express.Router();

// Test: GET http://localhost:3000/register
router.get("/register", authController.showRegister);

// Test: POST http://localhost:3000/register
router.post("/register", authController.register);

// Test: GET http://localhost:3000/login
router.get("/login", authController.showLogin);

// Test: POST http://localhost:3000/login
router.post("/login", authController.login);

// Test: GET http://localhost:3000/logout
router.get("/logout", authController.logout);

export default router;
