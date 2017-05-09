module.exports = function(app) {
    var controller = {};
    var contactService = app.services.contactService;

    controller.getContactsByPersonId = function(req, res) {
        return contactService.getContactsByPersonId(req, res);
    };

    controller.insertContact = function(req, res) {
        return contactService.insertContact(req, res);
    };

    controller.updateContact = function(req, res) {
        return contactService.updateContact(req, res);
    };

    controller.getContactById = function(req, res) {
        return contactService.getContactById(req, res);
    };
    
    controller.deleteContactById = function(req, res) {
        return contactService.deleteContactById(req, res);
    };

    return controller;
};