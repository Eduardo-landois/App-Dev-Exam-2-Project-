import express from "express";
import appointmentController from "../controllers/appointmentController.js";

// A Router is a "mini Express app" that holds a related group of routes
const router = express.Router();

// show the booking form and the logged in user's appointments
// Test: GET http://localhost:3000/appointments
router.get("/appointments", appointmentController.showAppointments);

// book a new appointment from the form
// Test: POST http://localhost:3000/appointments
router.post("/appointments", appointmentController.bookAppointment);

// cancel an upcoming appointment (forms can only send POST)
// Test: POST http://localhost:3000/appointments/1/cancel
router.post("/appointments/:id/cancel", appointmentController.cancelAppointment);

export default router;
