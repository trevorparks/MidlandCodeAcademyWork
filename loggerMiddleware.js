module.exports = function(req, res, next) {
    console.log("Middleware");
    next();
    //passes control to the next middleware
}