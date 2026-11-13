// Vehicle: a car owned by a customer
class Vehicle {
    constructor(id, ownerId, make, model, year, licensePlate) {
        this.id = id;
        this.ownerId = ownerId;           // the id of the User who owns this vehicle
        this.make = make;                 // ex: "Toyota"
        this.model = model;               // ex: "Corolla"
        this.year = year;                 // ex: 2022
        this.licensePlate = licensePlate; // ex: "ABC-1234"
    }
}

export default Vehicle;
