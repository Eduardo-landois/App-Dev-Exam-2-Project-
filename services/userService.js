import bcrypt from "bcrypt";
import User from "./classes/User.js";

const saltRounds = 10;

// In-memory list of users in a array acting like a database 
// users get lost when server restarts
const users = [
    // make manager account -> email: manager@autorepair.com  password: manager123
    new User(1, "Shop Manager", "manager@autorepair.com", bcrypt.hashSync("manager123", saltRounds), "manager")
];

// find a user by email, or undefined if not found
function findUserByEmail(email) {
    return users.find((user) => user.email === email);
}

// find a user by id, or undefined if not found
function findUserById(id) {
    return users.find((user) => user.id === id);
}

// create a new customer and add them to the list
// password must already be hashed with bcrypt before calling this
function addUser(name, email, hash) {
    const newUser = new User(
        Math.max(...users.map((user) => user.id)) + 1,
        name.trim(),
        email.trim(),
        hash,
        "customer"
    );

    users.push(newUser);
    return newUser;
}

export default { users, saltRounds, findUserByEmail, findUserById, addUser };
