import appointmentService from "../services/appointmentService.js";
import vehicleService from "../services/vehicleService.js";
import services from "../services/catalogService.js";

// gather everything the appointments page needs and render it
// (used by all three functions below so the page always looks the same)
function renderAppointmentsPage(req, res, status, error) {
    const vehicles = vehicleService.getVehiclesByOwner(req.user.id);

    // add the vehicle and service details to each appointment so the page can show names, not just ids
    const appointments = appointmentService.getAppointmentsByUser(req.user.id).map((appointment) => {
        return {
            id: appointment.id,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            vehicle: vehicleService.getVehicleById(appointment.vehicleId),
            service: services.find((service) => service.id === appointment.serviceId)
        };
    });

    res.status(status).render("appointments.ejs", {
        appointments,
        vehicles,
        services,
        timeSlots: appointmentService.timeSlots,
        today: appointmentService.getToday(),
        error
    });
}

// GET request for the appointments page (booking form + the user's appointments)
// Test: GET http://localhost:3000/appointments
function showAppointments(req, res) {
    if (req.isAuthenticated()) { // Passport function
        renderAppointmentsPage(req, res, 200);
    } else {
        res.redirect("/login");
    }
}

// POST request to book a new appointment
// Test: POST http://localhost:3000/appointments  (form fields: vehicleId, serviceId, date, time)
function bookAppointment(req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }

    // form values come in as text, so turn the ids into numbers
    const vehicleId = Number(req.body.vehicleId);
    const serviceId = Number(req.body.serviceId);
    const { date, time } = req.body;

    // validate Params
    const vehicle = vehicleService.getVehicleById(vehicleId);
    if (!vehicle || vehicle.ownerId !== req.user.id) {
        return renderAppointmentsPage(req, res, 400, "Please pick one of your vehicles.");
    }

    const service = services.find((service) => service.id === serviceId);
    if (!service) {
        return renderAppointmentsPage(req, res, 400, "Please pick a service.");
    }

    if (!appointmentService.isGoodDate(date) || !appointmentService.isGoodTimeSlot(time)) {
        return renderAppointmentsPage(req, res, 400, "Please pick a date (today or later) and a time slot.");
    }

    // make sure nobody else already has this time slot
    if (appointmentService.isSlotTaken(date, time)) {
        return renderAppointmentsPage(req, res, 400,`The ${time} slot on ${date} is already taken. Please pick another time.`);
    }

    appointmentService.bookAppointment(req.user.id, vehicleId, serviceId, date, time);
    res.redirect("/appointments");
}

// POST request to cancel one of the user's upcoming appointments
// (HTML forms can only send GET or POST, so we use POST)
// Test: POST http://localhost:3000/appointments/1/cancel
function cancelAppointment(req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }

    const id = Number(req.params.id);
    const cancelled = appointmentService.cancelAppointment(id, req.user.id);

    if (!cancelled) {
        return renderAppointmentsPage(req, res, 404, "Appointment not found!");
    }

    res.redirect("/appointments");
}

export default { showAppointments, bookAppointment, cancelAppointment };
