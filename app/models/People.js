var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var normalizeForSearch = require("normalize-for-search");
var beautifyUnique = require("mongoose-beautiful-unique-validation");

module.exports = function(app) {
    var schema = mongoose.Schema({
        name: { 
          type: String,
          required : true
        }, 
        filterName: {
          type: String
        },
        email: {
          type: String,
          required : true,
          unique : "O email informado já está cadastrado."
        }, 
        password: {
          type: String,
          required : true 
        },
    });

    function encryptPassword(next) {
        var people = this;

        if (people.name) {
            people.filterName = normalizeForSearch(people.name);
        }

        if (!people.isModified("password")) {
            return next();
        }

        function callback(error, hash) {
            if (error) {
              return next(error);
            }

            people.password = hash;
            next();
        };

        app.utils.bcryptUtils.encrypt(people.password, callback);
    };

    schema.pre("save", encryptPassword);
    schema.plugin(beautifyUnique);

    schema.methods.validatePassword = function(password, next) {
        function callback(error, isMatch) {
            if (error) {
                return next(error);
            }

            next(isMatch);
        };

        app.utils.bcryptUtils.compare(password, this.password, callback);
    };

    return mongoose.model("People", schema);
};