var jwt = require("jsonwebtoken");
var baseTest = require("./baseTest")();
var mongoose = require('mongoose');
const jwtSecret = app.config.config.jwtSecret;

var peopleMaria = {
  name: "Maria",
  email: "maria@hotmail.com",
  password: "123qwe"
};

var contactMaria = {
    name: "Contato 1 da Maria",
    phone: "48999991234",
    email: "laura@hotmail.com",
    whatsapp: "48123456789"
};

module.exports = function() {
    var People = app.models.People;

    function requestToken(_options, done) {
        var options = JSON.parse(JSON.stringify(_options));
        options.status = 401;

        var requestMethod = baseTest.getRequest(options);
        requestMethod.then(function(res, error) {
            expect(res.text.toLowerCase()).to.contain("unauthorized");
            if (done) {
                done(error);
            }
        });
    };

    function executeTests(_options) {
        var method = _options.method;
        var url = _options.url

        describe("Execute tests on token - " + method.toUpperCase() + " : " + url, function() {
            var id;
            var token;
            var tokenExpired;

            var contactId;

            beforeEach(function(done) {
                function callback(result) {
                    var person = result.person;

                    id = person.id;
                    token = person.token;
                    tokenExpired = person.tokenExpired;
                    contactId = result.contact.id;

                    done();
                };

                baseTest.setUp({peopleData : peopleMaria, contactData : contactMaria}, callback);
            });

            function getMethodUrl(id) {
                var methodUrl = url;
                if (methodUrl.endsWith("/:id")) {
                    if (methodUrl.indexOf("contacts") > 0) {
                        methodUrl = methodUrl.replace("/:id", "/" + contactId);
                    }

                    if (methodUrl.indexOf("people") > 0) {
                        methodUrl = methodUrl.replace("/:id", "/" + id);
                    }
                }

                return methodUrl; 
            }

            it("Returns status 401 when the token is invalid.", function(done) {
                var options = JSON.parse(JSON.stringify(_options));
                options.url = getMethodUrl(id);
                options.token = "meuToken";
                // options.token = token;

                requestToken(options, done);
            });

            it("Returns status 401 when the token is not informed.", function(done) {
                var options = JSON.parse(JSON.stringify(_options));
                options.url = getMethodUrl(id);
                options.token = null;
                // options.token = token;

                requestToken(options, done);
            });

            it("Returns status 401 when the token does not belong to the person being reported.", function(done) {
                var options = JSON.parse(JSON.stringify(_options));
                options.url = getMethodUrl(id);
                options.token = app.utils.tokenUtils.generate(mongoose.Types.ObjectId());
                // options.token = token;

                requestToken(options, done);
            });

            it("Returns status 401 when the token is expired.", function(done) {
                var options = JSON.parse(JSON.stringify(_options));
                options.url = getMethodUrl(id);
                options.token = tokenExpired;
                // options.token = token;

                requestToken(options, done);
            });
        });
    };

    return {
        executeTests : executeTests
    }
};