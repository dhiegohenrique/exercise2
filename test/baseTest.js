var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
const jwtSecret = app.config.config.jwtSecret;

module.exports = function() {
    var People = app.models.People;
    var Contact = app.models.Contact;

    function getRequest(options) {
        var requestMethod;
        var url = options.url;

        switch(options.method) {
            case "post":
                requestMethod = request.post(url);
                break;

            case "put":
                requestMethod = request.put(url);
                break;

            case "delete":
                requestMethod = request.delete(url);
                break;

            default:
                requestMethod = request.get(url);
                break;
        };

        var token = options.token;
        if (token) {
            requestMethod.set("Authorization", "JWT " + token);
        }

        var model = options.model;
        if (model) {
            requestMethod.send(model);
        }

        var status = options.status;
        if (status) {
            requestMethod.expect(status);
        }

        // requestMethod.expect('Content-Type', /json/)
        // requestMethod.expect('Content-Type', 'text/html')

        return requestMethod;
    };

    function requestDelete(_options, done) {
        var options = JSON.parse(JSON.stringify(_options));
        options.method = "delete";

        var requestDelete = getRequest(options);
        requestDelete.then(function(res, error) {
            expect(res.status).to.eql(options.status);

            if (done) {
                done(error);
            }
        });
    };

    function requestPut(_options, done) {
        var options = JSON.parse(JSON.stringify(_options));
        options.method = "put";

        var requestPut = getRequest(options);
        requestPut.then(function(res, error) {
            expect(res.status).to.eql(options.status);

            if (done) {
                done();
            }
        });
    };

    function getMethodUrl(options) {
        var url = options.url;
        var id = options.id;

        if (url.endsWith("/:id")) {
            url = url.replace("/:id", "/" + id);
        }

        return url; 
    };

    function requestGet(_options, callback) {
        var options = JSON.parse(JSON.stringify(_options));
        options.method = "get";

        var requestGet = getRequest(options);
        requestGet.expect('Content-Type', /json/);
        requestGet.then(function(res, error) {
            if (callback) {
                callback(res, error);
            }
        });
    };

    function requestGetResultNotFound(_options, done) {
        var options = JSON.parse(JSON.stringify(_options));
        options.method = "get";

        var requestGet = getRequest(options);
        requestGet.expect('Content-Type', /json/)
        requestGet.then(function(res, error) {
            expect(res.text.toLowerCase()).to.contain("não encontrad");
            done(error);
        });
    };

    function requestPost(_options, callback) {
        var options = JSON.parse(JSON.stringify(_options));
        options.method = "post";

        var requestPost = getRequest(options);
        requestPost.expect('Content-Type', /json/)
        requestPost.then(function(res, error) {
            if (callback) {
                callback(res, error);
            }
        });
    };

    function deleteAllModels(Model, callback) {
        Model.remove({}).exec()
            .then(function() {
                callback();
            }, function(error) {
                callback(error);
        });
    };

    function createModel(Model, modelData, callback) {
        Model.create(modelData)
            .then(function(result) {
                callback(null, result);
            }, function(error) {
                callback(error);
            });
    };

    function requestPostRequiredField(_options, done) {
        var options = JSON.parse(JSON.stringify(_options));
        options.status = 500;
        options.method = "post";

        function callback(res, error) {
            expect(res.text.toLowerCase()).to.contain("is required");
            done(error);
        };

        requestPost(options, callback);
    };

    function setUp(options, callback) {
        var peopleData = options.peopleData;
        var contactData = options.contactData;
        var person = {};
        var contact = {};

        function callbackInsertContact(error, result) {
            contact.id = result.id;
            callback({"person" : person, "contact" : contact});
        };

        function callbackInsertPeople(error, result) {
            person.id = result.id;
            person.token = jwt.sign({sub: person.id}, jwtSecret, {expiresIn : app.config.config.expiresIn});
            person.tokenExpired = jwt.sign({sub: person.id}, jwtSecret, {expiresIn : 0});

            if (contactData) {
                contactData.personId = person.id;
                createModel(Contact, contactData, callbackInsertContact);
                return;
            }

            callback({"person" : person});
        }

        function callbackDeleteContacts() {
            createModel(People, peopleData, callbackInsertPeople);
        };

        function callbackDeletePeople(error) {
            deleteAllModels(Contact, callbackDeleteContacts);
        };

        deleteAllModels(People, callbackDeletePeople);
    };

    return {
        requestDelete : requestDelete,
        requestPut : requestPut,
        requestGet : requestGet,
        requestPost : requestPost,
        deleteAllModels : deleteAllModels,
        createModel : createModel,
        requestPostRequiredField : requestPostRequiredField,
        setUp : setUp,
        requestGetResultNotFound : requestGetResultNotFound,
        getRequest : getRequest
    }
}