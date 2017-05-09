var baseTest = require("../baseTest")();
var mongoose = require('mongoose');
var tokenTest = require("../tokenTest")();

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

describe("Routes : people", function() {
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

            done();
        };

        baseTest.setUp({peopleData : peopleMaria, contactData : contactMaria}, callback);
    });

    describe("GET /people", function() {
        it("Returns status 200 when returning people successfully.", function(done) {
            function callback(res, error) {
                var people = JSON.parse(res.text);
                expect(people[0].name).to.equalIgnoreCase(peopleMaria.name);
                done(error);
            };

            var options = {
                url : "/people",
                status : 200
            };

            baseTest.requestGet(options, callback);
        });

        it("Checks if pagination is returning 2 results on the first 3 pages and 1 result on last.", function(done) {
            this.timeout(5000);
            var people = [];

            for (indexPeople = 0; indexPeople < 6; indexPeople++) {
                var newPeople = {
                    name: "nome" + indexPeople,
                    email: "email" + indexPeople + "@hotmail.com",
                    password: "senha" + indexPeople
                };

                people.push(newPeople);
            }

            function checkPagination() {
                var options = {
                    status : 200
                };

                for (indexPage = 0; indexPage < 4; indexPage++) {
                    options.url = "/people?index=" + indexPage + "&size=2";
                    var index = 0;

                    baseTest.requestGet(options, (res, error) => {
                        if (error) {
                            done(error);
                            return;
                        }

                        var people = JSON.parse(res.text);

                        if (index < 3) {
                            expect(people).to.be.lengthOf(2);
                        } else {
                            expect(people).to.be.lengthOf(1);
                            done(error);
                        }

                        index++;
                    });
                }
            };

            People.create(people)
                .then(function(result) {
                    checkPagination();
                })
                .catch(function(error){
                    done(error);
                });
        });
    });

    describe("GET /people/:id", function() {
        var options = {
            method : "get",
            url : "/people/:id"
        };

        tokenTest.executeTests(options);

        it("Returns status 404 when the person does not exist.", function(done) {
            var options = {
                url : "/people/" + mongoose.Types.ObjectId(),
                status : 404,
                "token" : token
            };

            baseTest.requestGetResultNotFound(options, done);
        });

        it("Returns status 200 when token and person are valid.", function(done) {
            function callbackSucess(res, error) {
                var resPeople = JSON.parse(res.text);

                function callback(error, isMatch) {
                    if (error || !isMatch) {
                        done(error);
                    }

                    resPeople[0].password = peopleMaria.password;
                    expect(JSON.stringify(peopleMaria)).to.eql(JSON.stringify(resPeople[0]));
                    done(error);
                };

                app.utils.bcryptUtils.compare(peopleMaria.password, resPeople[0].password, callback);
            };

            var options = {
                url : "/people/" + id,
                status : 200,
                "token" : token
            };

            baseTest.requestGet(options, callbackSucess);
        });
    });

    describe("POST /people", function() {
        it("Returns status 500 when a required field is not informed.", function(done) {
            var people = JSON.parse(JSON.stringify(peopleJoao));
            delete people.name;

            var options = {
                url : "/people",
                model : people
            };

            baseTest.requestPostRequiredField(options, done);
        });

        it("Returns status 500 when the informed email is already registered.", function(done) {
            var people = JSON.parse(JSON.stringify(peopleJoao));
            people.email = peopleMaria.email;

            function callback(res, error) {
                expect(res.text.toLowerCase()).to.contain("já está cadastrado");
                done(error);
            };

            var options = {
                url : "/people",
                status : 500,
                model : people
            };

            baseTest.requestPost(options, callback);
        });

        it("Returns status 201 when creating a successful person.", function(done) {
            function callback(res, error) {
                var model = JSON.parse(res.text);
                expect(model._id).to.not.be.undefined;
                expect(model._id).to.not.be.null;
                done(error);
            };

            var options = {
                url : "/people",
                status : 201,
                model : peopleJoao
            };

            baseTest.requestPost(options, callback);
        });
    });

    describe("PUT /people/:id", function() {
        var peopleEdit = JSON.parse(JSON.stringify(peopleMaria));
        peopleEdit.name = "Maria editada";
        peopleEdit.email = "maria_editada@hotmail.com";

        var options = {
            method : "put",
            url : "/people/:id",
            model : peopleEdit
        };

        tokenTest.executeTests(options);

        it("Returns status 204 when a person is updated.", function(done) {
            var options = {
                url : "/people/" + id,
                status : 204,
                "token" : token,
                model : peopleEdit
            };

            baseTest.requestPut(options, done);
        });
    });

    describe("DELETE /people:id", function() {
        var options = {
            method : "delete",
            url : "/people/:id"
        };

        tokenTest.executeTests(options);

        it("Returns status 204 when the person is deleted and all their contacts.", function(done) {
            var options = {
                url : "/people/" + id,
                status : 204,
                "token" : token
            };

            function callback() {
                app.models.Contact.count({"personId" : id}).exec()
                    .then(function(count) {
                        expect(count).to.be.eql(0);
                        done();
                    })
                    .catch(function(error) {
                        done(error);
                    });
            };

            baseTest.requestDelete(options, callback);
        });
    });
});