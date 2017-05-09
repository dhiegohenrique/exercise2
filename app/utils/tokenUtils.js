var jwt = require("jsonwebtoken");

module.exports = function(app) {
    var utils = {};
    var config = app.config.config;

    function generate(id) {
        var options = {
            expiresIn: parseInt(config.expiresIn)
        };

        var token = jwt.sign({sub: id}, config.jwtSecret, options);
        return token;
    };

    function validateTokenId(req, payload) {
        var id = req.params.id;
        return (id === payload.sub);
    };

    utils.generate = generate;
    utils.validateTokenId = validateTokenId;
    return utils;
};