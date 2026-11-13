import vehicleService from "../services/vehicleService.js";

// GET request for the garage page (only the logged in user's vehicles)
// Test: GET http://localhost:3000/garage
function showGarage(req, res) {
    if (req.isAuthenticated()) { // Passport function
        const vehicles = vehicleService.getVehiclesByOwner(req.user.id);
        res.status(200).render("garage.ejs", { vehicles });
    } else {
        res.redirect("/login");
    }
}

// POST request to add a vehicle to the logged in user's garage
// Test: POST http://localhost:3000/garage  (form fields: make, model, year, licensePlate)
function addVehicle(req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }

    const { make, model, licensePlate } = req.body;
    const year = Number(req.body.year); // form values come in as text, so turn the year into a number

    // validate Params
    if (!vehicleService.isGoodStringParam(make) ||
        !vehicleService.isGoodStringParam(model) ||
        !vehicleService.isGoodStringParam(licensePlate) ||
        !vehicleService.isGoodNumericParam(year) ||
        year < 1900 || year > new Date().getFullYear() + 1) {

        const vehicles = vehicleService.getVehiclesByOwner(req.user.id);
        return res.status(400).render("garage.ejs", {
            vehicles,
            error: "Make, model, a valid year, and license plate are required."
        });
    }

    vehicleService.addVehicle(req.user.id, make, model, year, licensePlate);
    res.redirect("/garage");
}

// POST request to remove a vehicle from the logged in user's garage
// (HTML forms can only send GET or POST, so we use POST instead of DELETE)
// Test: POST http://localhost:3000/garage/1/delete
function removeVehicle(req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }

    const id = Number(req.params.id);
    const removed = vehicleService.removeVehicle(id, req.user.id);

    if (!removed) {
        const vehicles = vehicleService.getVehiclesByOwner(req.user.id);
        return res.status(404).render("garage.ejs", {
            vehicles,
            error: "Vehicle not found!"
        });
    }

    res.redirect("/garage");
}

export default { showGarage, addVehicle, removeVehicle };
