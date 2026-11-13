import express from "express";
import managerController from "../controllers/managerController.js";

const router = express.Router();

// show all customers, appointments, and invoices (manager only)
// Test: GET http://localhost:3000/manager
router.get("/manager", managerController.showManager);

// mark an appointment completed and create its invoice (forms can only send POST)
// Test: POST http://localhost:3000/manager/appointments/1/complete
router.post("/manager/appointments/:id/complete", managerController.completeAppointment);

// mark an invoice as paid
// Test: POST http://localhost:3000/manager/invoices/1/paid
router.post("/manager/invoices/:id/paid", managerController.markInvoicePaid);

export default router;
