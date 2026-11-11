import bcrypt from "bcrypt";
import passport from "passport";
import userService from "../services/userService.js";

// GET request for the register page
// Test: GET http://localhost:3000/register
function showRegister(req, res) {
    res.status(200).render("register.ejs");
}

// GET request for the login page
// Test: GET http://localhost:3000/login
function showLogin(req, res) {
    res.status(200).render("login.ejs");
}

// POST request to create a new customer account
// Test: POST http://localhost:3000/register  (form fields: name, username, password)
function register(req, res) {
    const name = req.body.name;
    const email = req.body.username;
    const password = req.body.password;

    try {
        // check if the user already exists
        const registeredUser = userService.findUserByEmail(email);
        if (registeredUser) {
            res.send("Email already exists. Try logging in.");
        } else {
            // hash the password before storing it
            bcrypt.hash(password, userService.saltRounds, (err, hash) => {
                if (err) {
                    console.error("Error hashing password", err);
                    res.send("Something went wrong. Please try again.");
                } else {
                    // register the new user
                    const newUser = userService.addUser(name, email, hash);

                    // log the new user in right away, then send them home
                    req.login(newUser, (err) => {
                        if (err) {
                            console.error(err);
                        }
                        res.redirect("/");
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// POST request to log in (passport checks the email and password)
// Test: POST http://localhost:3000/login  (form fields: username, password)
const login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
});

// GET request to log out
// Test: GET http://localhost:3000/logout
function logout(req, res) {
    req.logout((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect("/");
    });
}

export default { showRegister, showLogin, register, login, logout };
