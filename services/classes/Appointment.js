// Appointment: links a User, one of their Vehicles, and a Service to a date and time slot
class Appointment {
    constructor(id, userId, vehicleId, serviceId, date, time, status = "upcoming") {
        this.id = id;
        this.userId = userId;       // the id of the User who booked it
        this.vehicleId = vehicleId; // the id of the Vehicle being worked on
        this.serviceId = serviceId; // the id of the Service being done
        this.date = date;           // ex: "2026-11-20"
        this.time = time;           // ex: "09:00" (one of the shop's time slots)
        this.status = status;       // "upcoming", "completed", or "cancelled"
    }
}

export default Appointment;
