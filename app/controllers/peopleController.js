module.exports = function(app) {
    var controller = {};
    var peopleService = app.services.peopleService;

    controller.getPeople = function(req, res) {
        return peopleService.getPeople(req, res);
    };

    controller.insertPeople = function(req, res) {
        return peopleService.insertPeople(req, res);
    };

    controller.updatePeople = function(req, res) {
        return peopleService.updatePeople(req, res);
    };

    controller.getPeopleById = function(req, res) {
        return peopleService.getPeopleById(req, res);
    };
    
    controller.deletePeople = function(req, res) {
        return peopleService.deletePeople(req, res);
    };

    return controller;
};