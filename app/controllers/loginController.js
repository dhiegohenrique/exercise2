module.exports = function(app) {
    var controller = {};
    var loginService = app.services.loginService;

    controller.login = function(req, res) {
        return loginService.login(req, res);
    };

    return controller;
};