var mongoose = require("mongoose");
var normalizeForSearch = require("normalize-for-search");

module.exports = function() {
  var schema = mongoose.Schema({
    name: { 
      type: String,
      required: true
    },
    filterName: {
      type: String
    }, 
    phone: {
      type: String
    }, 
    email: {
      type: String 
    }, 
    whatsapp: {
      type: String 
    },
    personId: {
      type: mongoose.Schema.ObjectId,
      ref: "People" 
    }
  });

  function normalizeName(next) {
      var contact = this;

      if (contact.name) {
          contact.filterName = normalizeForSearch(contact.name);
      }

      next();
  };

  schema.pre("save", normalizeName);

  return mongoose.model("Contact", schema);
};