var baseTest = require("../baseTest")();

var newPeople = {
  name: "Maria",
  email: "maria@hotmail.com",
  password: "123qwe"
};

describe("Routes : login", function() {
    beforeEach(function(done) {
        baseTest.setUp({peopleData : newPeople}, () => {
            done();
        });
    });

    describe("POST /login", function() {
        it("Returns status 500 when email and password are blank.", function(done) {
            request.post("/login")
                .expect(500)
                .expect('Content-Type', /json/)
                .then(function(res, error) {
                    expect(res.text.toLowerCase()).to.contain("preencha o email e a senha.");
                    done(error);
                });
        });

        it("Returns status 404 when email not exists.", function(done) {
            var login = {
                email : "email@hotmail.com",
                password : "123qwe"
            };

            request.post("/login")
                .send(login)
                .expect(404)
                .expect('Content-Type', /json/)
                .then(function(res, error) {
                    expect(res.text.toLowerCase()).to.contain("email não cadastrado.");
                    done(error);
                });
        });

        it("Returns status 401 when password is incorrect.", function(done) {
            var login = {
                email : "maria@hotmail.com",
                password : "senha"
            };

            request.post("/login")
                .send(login)
                .expect(401)
                .expect('Content-Type', /json/)
                .then(function(res, error) {
                    expect(res.text.toLowerCase()).to.contain("senha incorreta.");
                    done(error);
                });
        });

        it("Returns the token when email and password is correct.", function(done) {
            request.post("/login")
                .send(newPeople)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function(res, error) {
                    expect(res.text).to.have.string("token");
                    done(error);
                });
        });
    });
});