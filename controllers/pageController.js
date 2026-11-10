import services from "../services/catalogService.js";

// GET request for the home page
// Test: GET http://localhost:3000/
function showHome(req, res) {
    res.status(200).render("index.ejs");
}

// GET request for the service catalog page
// Test: GET http://localhost:3000/services
function showServices(req, res) {
    res.status(200).render("services.ejs", { services });
}

export default { showHome, showServices };