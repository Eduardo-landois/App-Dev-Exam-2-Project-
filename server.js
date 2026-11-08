import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET request for the home page
// Test: GET http://localhost:3000/
app.get("/", (req, res) => {
    res.status(200).render("index.ejs");
});

// TODO: move page routes into routes/pages.js and mount them with app.use("/", pageRoutes);

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});
