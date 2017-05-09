var bcrypt = require("bcrypt-nodejs");

module.exports = function() {
    var utils = {};

    function encrypt(password, callback) {
        bcrypt.genSalt(5, function(err, salt) {
            if (err) {
              return callback(err);
            }

            bcrypt.hash(password, salt, null, function(err, hash) {
              if (err) {
                return callback(err); 
              }

              callback(err, hash);
          });
      });
    };

    function compare(password1, password2, callback) {
        bcrypt.compare(password1, password2, function(error, isMatch) {
            if (error) {
                return callback(error);
            }

            callback(error, isMatch);
        });
    };

    utils.encrypt = encrypt;
    utils.compare = compare;
    return utils;
};