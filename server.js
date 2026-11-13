import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

import pageRoutes from "./routes/pages.js";
import authRoutes from "./routes/auth.js";
import vehicleRoutes from "./routes/vehicles.js";
import appointmentRoutes from "./routes/appointments.js";
import userService from "./services/userService.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// (remembers who is logged in) 
app.use(session(
  {
    secret: "SECRET-KEY-AUTO-REPAIR",
    resave: false,
    saveUninitialized: true
  }
));


app.use(passport.initialize());
app.use(passport.session());

// make the logged in user so that it can be accessed in the ejs templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


// page routes (/, /services) live in routes/pages.js
app.use("/", pageRoutes);
// account routes (/register, /login, /logout) live in routes/auth.js
app.use("/", authRoutes);
// garage routes (/garage, /garage/:id/delete) live in routes/vehicles.js
app.use("/", vehicleRoutes);
// appointment routes (/appointments, /appointments/:id/cancel) live in routes/appointments.js
app.use("/", appointmentRoutes);


// the login form sends "username" (the email) and "password"
passport.use(new Strategy(function verify(username, password, cb) {
  try {
    const registeredUser = userService.findUserByEmail(username);

    if (registeredUser) {
    // compare the password from the form with the hashed password in the database
      bcrypt.compare(password, registeredUser.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords: ", err);
          return cb(err);
        } else {
          if (result) {
            return cb(null, registeredUser); // correct password
          } else {
            return cb(null, false);          // wrong password
          }
        }
      });
    } else {
      return cb(null, false);                // user not found
    }
  } catch (err) {
    return cb(err);
  }
}));

// save only the user's id in the session
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// use the id from the session to find the full user again
passport.deserializeUser((id, cb) => {
  cb(null, userService.findUserById(id));
});

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});
