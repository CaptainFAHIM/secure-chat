const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next){
    next(createError(404, "Not found!"));
}

// Default error handler
function errorHandler(err, req, res, next){
    res.locals.error = err;
    res.status(err.status || 500);
    if(res.locals.html){
        // html response for error
        res.render("error", {
            title: "Error Page"
        });
    } else{
        // json response for error
        res.json(res.locals.error);
    }
}

module.exports = {
    notFoundHandler,
    errorHandler,
};