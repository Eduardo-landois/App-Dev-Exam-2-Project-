// runs when no route matched the URL (ex: /garag instead of /garage)
// creates a 404 error and passes it to the errorHandler below
const notFound = (req, res, next) => {
    const error = new Error(`Page not found: ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

// runs when something goes wrong anywhere in the app
// (same idea as the errorHandler in the layered project, but it shows a page instead of JSON)
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;

    res.status(status).render("error.ejs", {
        status,
        message: status === 404 ? err.message : "Internal Server Error. Please try again later."
    });
};

export default { notFound, errorHandler };
