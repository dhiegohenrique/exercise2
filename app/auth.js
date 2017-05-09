var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var baseService = require("../app/services/baseService")();
var baseCriteria = require("../app/criteria/BaseCriteria")();
var People = require("../app/models/People");

module.exports = function(app) {
    const options = {
        secretOrKey: app.config.config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        passReqToCallback: true
    };

    var strategy = new Strategy(options, function(req, payload, done) {
        var baseCriteria = new app.criteria.BaseCriteria();
        baseCriteria.setModel(app.models.People);
        baseCriteria.setQuery({"_id" : payload.sub});

        app.services.baseService.getCount(baseCriteria)
            .then(function(count) {
                if (count && count > 0) {
                    return done(null, {personId : payload.sub});
                }

                return done(null, false);
            })
            .catch(function(error) {
                return done(error, null);
            });
    });

    passport.use("jwt", strategy);

    return {
        initialize : function() {
            return passport.initialize();
        },

        authenticate : function() {
            var options = {
                session : false
            }

            return passport.authenticate("jwt", options);
        }
    }
};