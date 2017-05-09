var isBlank = require("is-blank");

module.exports = function(app) {
    var service = {};

    service.login = function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        if (!validateLogin({"email" : email, "password" : password})) {
            res.status(500).json({msg : "Preencha o email e a senha."});
            return;
        }

        var options = {
            "res" : res,
            "email" : email,
            "password" : password
        };

        doLogin(options);
    };

    function validateLogin(options) {
        var email = options.email;
        var password = options.password;

        return (!isBlank(email) && !isBlank(password));
    };

    function doLogin(options) {
        var res = options.res;
        var email = options.email;
        var password = options.password;

        var People = app.models.People;
        var whereConditions = {"email" : email};
        var fields = "_id password";

        People.findOne(whereConditions, fields)
            .exec()
            .then(function(people) {
                options.people = people;
                callBackSucess(options);
            })
            .catch(function(error) {
                res.status(401).json({msg : error});
            });
    };

    function callBackSucess(options) {
        var res = options.res;
        var password = options.password;
        var people = options.people;

        if (isBlank(people)) {
            res.status(404).json({msg : "Email não cadastrado."});
            return;
        }

        people.validatePassword(password, function(isMatch) {
            if (!isMatch) {
                res.status(401).json({msg : "Senha incorreta."});
                return;
            }

            var token = app.utils.tokenUtils.generate(people.id);
            res.status(200).json({token: token});
        });
    };

    return service;
};