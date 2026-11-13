// Invoice: the bill for a completed appointment
class Invoice {
    constructor(id, appointmentId, userId, total, dateIssued, paid = false) {
        this.id = id;
        this.appointmentId = appointmentId; // the id of the completed Appointment
        this.userId = userId;               // the id of the User (customer) who owes it
        this.total = total;                 // the price of the service, ex: 49.99
        this.dateIssued = dateIssued;       // ex: "2026-11-13"
        this.paid = paid;                   // false until the manager marks it paid
    }
}

export default Invoice;
