var baseTest = require("../baseTest")();
var mongoose = require('mongoose');
var tokenTest = require("../tokenTest")();
var jsonEqual = require('node-json-equal');
var Promise = require('bluebird');

var peopleMaria = {
  name: "Maria",
  email: "maria@hotmail.com",
  password: "123qwe"
};

var peopleJoao = {
  name : "João",
  email : "joao@hotmail.com",
  password : "senha123"
};

var contactMaria = {
    name: "Contato 1 da Maria",
    phone: "48999991234",
    email: "laura@hotmail.com",
    whatsapp: "48123456789"
};

var contactJoao = {
    name: "João da Silva",
    phone: "3533332222",
    email: "joao.silva@hotmail.com",
    whatsapp: "3599113355"
};

describe("Routes : contacts", function() {
    var People = app.models.People;

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
            contactMaria._id = contactId;

            // done();
        };

        baseTest.setUp({peopleData : peopleMaria, contactData : contactMaria}, callback);
    });

    describe("GET /contacts", function() {
        var options = {
            method : "get",
            url : "/contacts"
        };

        tokenTest.executeTests(options);

        it("Returns status 200 when returning contacts successfully.", function(done) {
            function callback(res, error) {
                var contacts = JSON.parse(res.text);
                expect(contacts[0].name).to.equalIgnoreCase(contactMaria.name);
                done(error);
            };

            var options = {
                url : "/contacts",
                status : 200,
                "token" : token
            };

            baseTest.requestGet(options, callback);
        });

        it("Checks if pagination is returning 2 results on the first 2 pages and 1 result on last.", function(done) {
            this.timeout(5000);

            var contacts = [];
            for (indexContact = 0; indexContact < 5; indexContact++) {
                var contact = {
                    name: "Contact" + indexContact,
                    personId : id
                };

                contacts.push(contact);
            }

            function checkPagination() {
                var options = {
                    status : 200,
                    "token" : token
                };

                var promisePage0 = new Promise(function(resolve, reject) {
                    options.url = "/contacts?index=0&size=2";
                    baseTest.requestGet(options, (res, error) => {
                        if (error) {
                            done(error);
                            return;
                        }

                        var contacts = JSON.parse(res.text);
                        resolve(contacts.length);
                    });
                });

                var promisePage1 = new Promise(function(resolve, reject) {
                    options.url = "/contacts?index=1&size=2";
                    baseTest.requestGet(options, (res, error) => {
                        if (error) {
                            done(error);
                            return;
                        }

                        var contacts = JSON.parse(res.text);
                        resolve(contacts.length);
                    });
                });

                var promisePage2 = new Promise(function(resolve, reject) {
                    options.url = "/contacts?index=2&size=2";
                    baseTest.requestGet(options, (res, error) => {
                        if (error) {
                            done(error);
                            return;
                        }

                        var contacts = JSON.parse(res.text);
                        resolve(contacts.length);
                    });
                });

                Promise.all([promisePage0, promisePage1, promisePage2]).then(function(results) {
                    expect(results[0]).to.be.eql(2);
                    expect(results[1]).to.be.eql(2);
                    expect(results[2]).to.be.eql(1);
                    done();
                });
            };

            app.models.Contact.remove({}).exec()
                .then(function() {
                    app.models.Contact.create(contacts)
                        .then(function(result) {
                            checkPagination();
                        })
                        .catch(function(error){
                            done(error);
                        });
                }, function(error) {
                    done(error);
                });
        });
    });

    describe("GET /contacts/:id", function() {
        var options = {
            method : "get",
            url : "/contacts/:id"
        };

        tokenTest.executeTests(options);

        it("Returns status 404 when the contact does not exist.", function(done) {
            var options = {
                url : "/contacts/" + mongoose.Types.ObjectId(),
                status : 404,
                "token" : token
            };

            baseTest.requestGetResultNotFound(options, done);
        });

        it("Returns status 200 when returning the contact successfully.", function(done) {
            function callback(res, error) {
                var contacts = JSON.parse(res.text);
                expect(jsonEqual(contacts[0], contactMaria)).to.eql(true);
                done(error);
            };

            var options = {
                url : "/contacts/" + contactId,
                status : 200,
                "token" : token
            };

            baseTest.requestGet(options, callback);
        });
    });

    describe("POST /contacts", function() {
        var options = {
            method : "post",
            url : "/contacts",
            model : contactJoao
        };

        tokenTest.executeTests(options);

        it("Returns status 500 when a required field is not informed.", function(done) {
            var contact = JSON.parse(JSON.stringify(contactJoao));
            delete contact.name;

            var optionsRequiredField = JSON.parse(JSON.stringify(options));
            optionsRequiredField.model = contact;
            optionsRequiredField.token = token;
            baseTest.requestPostRequiredField(optionsRequiredField, done);
        });

        it("Returns status 201 when creating the contact successfully.", function(done) {
            function callback(res, error) {
                var model = JSON.parse(res.text);
                expect(model._id).to.not.be.undefined;
                expect(model._id).to.not.be.null;
                done(error);
            };

            var optionsPost = JSON.parse(JSON.stringify(options));
            optionsPost.token = token;
            optionsPost.status = 201;
            baseTest.requestPost(optionsPost, callback);
        });
    });

    describe("PUT /people/:id", function() {
        var contactEdit = JSON.parse(JSON.stringify(contactMaria));
        contactEdit.name = "Contato 1 da Maria que agora está editado",
        contactEdit.phone = "4811111111",
        contactEdit.email = "mariaEditada@hotmail.com",
        contactEdit.whatsapp = "4822222222"

        var options = {
            method : "put",
            url : "/contacts/:id",
            model : contactEdit
        };

        tokenTest.executeTests(options);

        it("Returns status 204 when a person is updated.", function(done) {
            var options = {
                url : "/contacts/" + contactId,
                status : 204,
                "token" : token,
                model : contactEdit
            };

            baseTest.requestPut(options, done);
        });
    });

    describe("DELETE /people:id", function() {
        var options = {
            method : "delete",
            url : "/contacts/:id"
        };

        tokenTest.executeTests(options);

        it("Returns status 204 when a person is deleted.", function(done) {
            var options = {
                url : "/contacts/" + contactId,
                status : 204,
                "token" : token
            };

            baseTest.requestDelete(options, done);
        });
    });
});