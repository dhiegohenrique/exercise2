var express = require("express");
var load = require("express-load");

module.exports = function() {
    var app = express();

    load("config/config", { cwd: "app" })
        .then("utils")
        .then("models")
        .then("criteria")
        .then("services")
        .then("controllers")
        .then("./auth.js")
        .then("./middlewares.js")
        .then("routes")
        .into(app);

    app.get("*", function(req, res) {
        res.status(404).json({msg : "Page not found."});
    });

    return app;
};