import fs from "fs";
import Service from "./classes/Services.js";

// read the services from the JSON file and turn the text into an array
const data = JSON.parse(fs.readFileSync("data/services.json", "utf-8"));

// turn each plain object into a Service object form Services.js class and store them in an array
const services = data.map((s) => new Service(s.id, s.name, s.description, s.price, s.estimatedTime));

export default services;
