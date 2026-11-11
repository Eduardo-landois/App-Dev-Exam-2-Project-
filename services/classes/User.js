// User: a customer or a manager of the shop
class User {
    constructor(id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password; // stored as a bcrypt hash, never plain text
        this.role = role;         // "customer" or "manager"
    }
}

export default User;
