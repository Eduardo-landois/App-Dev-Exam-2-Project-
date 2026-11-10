
// Service: a repair or maintenance job that the shop offers
class Service {
    constructor(id, name, description, price, estimatedTime) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.estimatedTime = estimatedTime; // in minutes
    }
}

export default Service;
