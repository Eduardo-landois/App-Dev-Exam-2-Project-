import Invoice from "./classes/Invoice.js";

// In-memory list of invoices in an array acting like a database
// invoices get lost when the server restarts
const invoices = [];

// return every invoice for manager only 
function getAllInvoices() {
    return invoices;
}

// return only the invoices that belong to one user
function getInvoicesByUser(userId) {
    return invoices.filter((invoice) => invoice.userId === userId);
}

// find an invoice by id, or undefined if not found
function getInvoiceById(id) {
    return invoices.find((invoice) => invoice.id === id);
}

// find the invoice for one appointment, or undefined if it doesn't have one yet
function getInvoiceByAppointment(appointmentId) {
    return invoices.find((invoice) => invoice.appointmentId === appointmentId);
}

// create a new unpaid invoice for a completed appointment and add it to the list
function createInvoice(appointmentId, userId, total, dateIssued) {
    const newInvoice = new Invoice(
        invoices.length > 0 ? Math.max(...invoices.map((invoice) => invoice.id)) + 1 : 1,
        appointmentId,
        userId,
        total,
        dateIssued
    );

    invoices.push(newInvoice);
    return newInvoice;
}

// mark an invoice as paid
// returns true if it was marked paid, false if not found or already paid
function markPaid(id) {
    const invoice = getInvoiceById(id);

    if (!invoice || invoice.paid) {
        return false;
    }

    invoice.paid = true;
    return true;
}

export default {
    invoices,
    getAllInvoices,
    getInvoicesByUser,
    getInvoiceById,
    getInvoiceByAppointment,
    createInvoice,
    markPaid
};
