import Vehicle from "./classes/Vehicle.js";

// In-memory list of vehicles in an array acting like a database
// starts empty, customers add their own vehicles from the garage page
// vehicles get lost when the server restarts
const vehicles = [];

// validation helpers
function isGoodStringParam(param) {
    return typeof param === "string" && param.trim().length > 0;
}

function isGoodNumericParam(param) {
    return typeof param === "number" && Number.isFinite(param);
}

// return only the vehicles that belong to one user
function getVehiclesByOwner(ownerId) {
    return vehicles.filter((vehicle) => vehicle.ownerId === ownerId);
}

// find a vehicle by id, or undefined if not found
function getVehicleById(id) {
    return vehicles.find((vehicle) => vehicle.id === id);
}

// create a new vehicle for a user and add it to the list
function addVehicle(ownerId, make, model, year, licensePlate) {
    const newVehicle = new Vehicle(
        vehicles.length > 0 ? Math.max(...vehicles.map((vehicle) => vehicle.id)) + 1 : 1,
        ownerId,
        make.trim(),
        model.trim(),
        year,
        licensePlate.trim().toUpperCase()
    );

    vehicles.push(newVehicle);
    return newVehicle;
}

// remove a vehicle, but only if it belongs to this user
// returns true if it was removed, false if not found
function removeVehicle(id, ownerId) {
    const vehicleIx = vehicles.findIndex((vehicle) => vehicle.id === id && vehicle.ownerId === ownerId);

    if (vehicleIx === -1) {
        return false;
    }

    vehicles.splice(vehicleIx, 1);
    return true;
}

export default {
    vehicles,
    isGoodStringParam,
    isGoodNumericParam,
    getVehiclesByOwner,
    getVehicleById,
    addVehicle,
    removeVehicle
};
