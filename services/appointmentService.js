import Appointment from "./classes/Appointment.js";

// In-memory list of appointments in an array acting like a database
// appointments get lost when the server restarts
const appointments = [];

// the shop's time slots, every hour from 8:00 AM to 4:00 PM
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

// today's date as "YYYY-MM-DD" 
function getToday() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
}

// validation helpers
// a good date looks like "2026-11-20" and is today or later
function isGoodDate(date) {
    return typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= getToday();
}

// a good time is one of the shop's time slots
function isGoodTimeSlot(time) {
    return timeSlots.includes(time);
}

// check if someone already has an upcoming appointment at this date and time
function isSlotTaken(date, time) {
    const taken = appointments.find((appointment) =>
        appointment.date === date &&
        appointment.time === time &&
        appointment.status === "upcoming"
    );
    return taken !== undefined;
}

// return only the appointments that belong to that user
function getAppointmentsByUser(userId) {
    return appointments.filter((appointment) => appointment.userId === userId);
}

// return every appointment for manager
function getAllAppointments() {
    return appointments;
}

// find an appointment by id, or undefined if not found
function getAppointmentById(id) {
    return appointments.find((appointment) => appointment.id === id);
}

// create a new upcoming appointment and add it to the list
function bookAppointment(userId, vehicleId, serviceId, date, time) {
    const newAppointment = new Appointment(
        appointments.length > 0 ? Math.max(...appointments.map((appointment) => appointment.id)) + 1 : 1,
        userId,
        vehicleId,
        serviceId,
        date,
        time
    );

    appointments.push(newAppointment);
    return newAppointment;
}

// cancel an appointment, but only if it belongs to this user and is still upcoming
// returns true if it was cancelled, false if not
function cancelAppointment(id, userId) {
    const appointment = appointments.find((appointment) => appointment.id === id && appointment.userId === userId);

    if (!appointment || appointment.status !== "upcoming") {
        return false;
    }

    appointment.status = "cancelled";
    return true;
}

// mark an appointment as completed (manager only), but only if it is still upcoming
// returns the completed appointment, or undefined if not found or not upcoming
function completeAppointment(id) {
    const appointment = getAppointmentById(id);

    if (!appointment || appointment.status !== "upcoming") {
        return undefined;
    }

    appointment.status = "completed";
    return appointment;
}

export default {
    appointments,
    timeSlots,
    getToday,
    isGoodDate,
    isGoodTimeSlot,
    isSlotTaken,
    getAppointmentsByUser,
    getAllAppointments,
    getAppointmentById,
    bookAppointment,
    cancelAppointment,
    completeAppointment
};
