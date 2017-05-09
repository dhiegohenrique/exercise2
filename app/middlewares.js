var bodyParser = require("body-parser");
var config = require("./config/config")();
var cors = require("cors");
var morgan = require("morgan");
var logger = require("./logger");
var helmet = require("helmet");
var compression = require("compression");
var express = require("express");
var config = require("./config/config")();

module.exports = function(app) {
    app.set("port", config.port || 3000);

    if (config.debug) {
        app.use(morgan("common", {
            stream : {
                write : function(message) {
                    logger.info(message);
                }
            }
        }));
    }

    app.use(cors({
        methods : ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders : ["Content-Type", "Authorization"]
    }));

    app.use(compression());
    app.use(helmet());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require("method-override")());
    app.use(app.auth.initialize());

    app.use(express.static("public"));
};