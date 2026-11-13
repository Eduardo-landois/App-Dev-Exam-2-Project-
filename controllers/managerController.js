import appointmentService from "../services/appointmentService.js";
import invoiceService from "../services/invoiceService.js";
import userService from "../services/userService.js";
import vehicleService from "../services/vehicleService.js";
import services from "../services/catalogService.js";

// check that someone is logged in AND is the manager
// not logged in -> send to login, logged in customer -> send home
// returns true if they are allowed in
function checkManager(req, res) {
    if (!req.isAuthenticated()) { // Passport function
        res.redirect("/login");
        return false;
    }
    if (req.user.role !== "manager") {
        res.redirect("/");
        return false;
    }
    return true;
}

// gather everything the manager page needs and render it
function renderManagerPage(req, res, status, error) {
    const customers = userService.getAllCustomers();

    // add the customer, vehicle, service, and invoice details to each appointment
    const appointments = appointmentService.getAllAppointments().map((appointment) => {
        return {
            id: appointment.id,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            customer: customers.find((customer) => customer.id === appointment.userId),
            vehicle: vehicleService.getVehicleById(appointment.vehicleId),
            service: services.find((service) => service.id === appointment.serviceId),
            invoice: invoiceService.getInvoiceByAppointment(appointment.id)
        };
    });

    // add the customer name to each invoice
    const invoices = invoiceService.getAllInvoices().map((invoice) => {
        return {
            id: invoice.id,
            appointmentId: invoice.appointmentId,
            total: invoice.total,
            dateIssued: invoice.dateIssued,
            paid: invoice.paid,
            customer: customers.find((customer) => customer.id === invoice.userId)
        };
    });

    res.status(status).render("manager.ejs", {
        customers,
        appointments,
        invoices,
        error
    });
}

// GET request for the manager page (all customers, appointments, and invoices)
// Test: GET http://localhost:3000/manager
function showManager(req, res) {
    if (!checkManager(req, res)) {
        return;
    }
    renderManagerPage(req, res, 200);
}

// POST request to mark an appointment completed, which also creates its invoice
// Test: POST http://localhost:3000/manager/appointments/1/complete
function completeAppointment(req, res) {
    if (!checkManager(req, res)) {
        return;
    }

    const id = Number(req.params.id);

    // only one invoice per appointment
    if (invoiceService.getInvoiceByAppointment(id)) {
        return renderManagerPage(req, res, 400, "That appointment already has an invoice.");
    }

    const appointment = appointmentService.completeAppointment(id);
    if (!appointment) {
        return renderManagerPage(req, res, 404, "Upcoming appointment not found!");
    }

    // the invoice total is the price of the service that was done
    const service = services.find((service) => service.id === appointment.serviceId);
    invoiceService.createInvoice(appointment.id, appointment.userId, service.price, appointmentService.getToday());

    res.redirect("/manager");
}

// POST request to mark an invoice as paid
// Test: POST http://localhost:3000/manager/invoices/1/paid
function markInvoicePaid(req, res) {
    if (!checkManager(req, res)) {
        return;
    }

    const id = Number(req.params.id);
    const paid = invoiceService.markPaid(id);

    if (!paid) {
        return renderManagerPage(req, res, 404, "Unpaid invoice not found!");
    }

    res.redirect("/manager");
}

export default { showManager, completeAppointment, markInvoicePaid };
