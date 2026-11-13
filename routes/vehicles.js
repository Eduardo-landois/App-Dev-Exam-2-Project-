import express from "express";
import vehicleController from "../controllers/vehicleController.js";

// A Router is a "mini Express app" that holds a related group of routes
const router = express.Router();

// show the logged in user's vehicles
// Test: GET http://localhost:3000/garage
router.get("/garage", vehicleController.showGarage);

// add a vehicle from the garage form
// Test: POST http://localhost:3000/garage
router.post("/garage", vehicleController.addVehicle);

// remove a vehicle (forms can only send POST, so this is POST instead of DELETE)
// Test: POST http://localhost:3000/garage/1/delete
router.post("/garage/:id/delete", vehicleController.removeVehicle);

export default router;
