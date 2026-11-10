import express from "express";
import pageRoutes from "./routes/pages.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// all page routes (/, /services) live in routes/pages.js
app.use("/", pageRoutes);

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});
