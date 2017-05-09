var config = require("../config/config")();
var baseService = require("./baseService")();
var createError = require("http-errors");
var isBlank = require("is-blank");
var mongoSanitize = require("mongo-sanitize");

module.exports = function(app) {
    var service = {};
    var People = app.models.People;

    function getOptions(req, res, errorMessage) {
        var options = {
            "req" : req,
            "res" : res,
            statusMessages : getStatusMessages(errorMessage)
        };

        if (!isBlank(req.params.id)) {
            req.params.id = mongoSanitize(req.params.id);
        }

        return options;
    };

    function insertPeople(req, res) {
        var baseCriteria = getBaseCriteria();
        baseCriteria.setValues(getValues(req));
        var statusMessages = getStatusMessages("Erro ao criar pessoa: ");

        var options = {
            "res" : res,
            "baseCriteria" : baseCriteria,
            "statusMessages" : statusMessages
        };

        baseService.insert(options);
    };

    function validatePersonId(options, callback) {
        var req = options.req;
        var res = options.res;
        var id = req.params.id;

        if (id === req.user.personId) {
            callback();
            return;
        }

        options.status = 401;
        res.status(options.status).json({msg : baseService.getStatusMessage(options)});
    };

    function validatePersonFound(options, callback) {
        var personId = options.req.params.id;
        var baseCriteria = getBaseCriteria();
        baseCriteria.setQuery({"_id" : personId});

        baseService.getCount(baseCriteria)
            .then(function(count) {
                callback(null, count);
            })
            .catch(function(error) {
                callback(error);
            });
    };

    function validateCallback(options) {
        var res = options.res;

        if (options.error) {
            options.status = 500;
            res.status(options.status).json({msg : baseService.getStatusMessage(options) + options.error});
            return;
        }

        var count = options.count;
        if (!count || count === 0) {
            options.status = 404;
            res.status(options.status).json({msg : baseService.getStatusMessage(options)});
            return;
        }

        return true;
    };

    function validate(options, done) {
        validatePersonFound(options, (error, count) => {
            options.error = error;
            options.count = count

            if (!validateCallback(options)) {
                return;
            }

            validatePersonId(options, done);
        });
    };

    function updatePeople(req, res) {
        var options = getOptions(req, res, "Erro ao atualizar pessoa: ");

        validate(options, () => {
            var baseCriteria = getBaseCriteria();
            baseCriteria.setValues(getValues(req));
            baseCriteria.setQuery({"_id" : req.params.id});

            options.baseCriteria = baseCriteria;
            baseService.update(options);
        });
    };

    function getValues(req) {
        var values = {};

        if (!isBlank(req.body._id)) {
            values.id = mongoSanitize(req.body._id);
        }

        if (!isBlank(req.body.name)) {
            values.name = req.body.name;
        }

        if (!isBlank(req.body.email)) {
            values.email = req.body.email;
        }

        if (!isBlank(req.body.password)) {
            values.password = req.body.password;
        }

        return values;
    };

    function getPeople(req, res) {
        var baseCriteria = getBaseCriteria();
        baseCriteria.setFields("name email");
        var query = req.query;
        if (query && query.index) {
            baseCriteria.setPageIndex(query.index);
        }

        if (query && query.size) {
            baseCriteria.setPageSize(query.size);
        }

        var options = getOptions(req, res, "Não foi possível recuperar as pessoas.");
        options.baseCriteria = baseCriteria;
        baseService.find(options);
    };

    function getPeopleById(req, res) {
        var options = getOptions(req, res, "Erro ao recuperar pessoa pelo ID.");

        validate(options, () => {
            var baseCriteria = getBaseCriteria();
            baseCriteria.setFields("-_id name email password");
            baseCriteria.setQuery({"_id" : req.params.id});

            options.baseCriteria = baseCriteria;
            baseService.find(options);
        });
    };

    function deletePeople(req, res) {
        var options = getOptions(req, res, "Erro ao deletar pessoa pelo ID.");

        function callbackDeleteContacts() {
            var contactService = app.services.contactService;
            contactService.deleteContactsByPersonId(req.params.id, () => {
                res.status(204).end();  
            });
        };

        validate(options, () => {
            var baseCriteria = getBaseCriteria();
            baseCriteria.setQuery({"_id" : req.params.id});

            options.baseCriteria = baseCriteria;
            baseService.remove(options, callbackDeleteContacts);
        });
    };

    function getBaseCriteria() {
        var baseCriteria = new app.criteria.BaseCriteria();
        baseCriteria.setModel(People);
        baseCriteria.setOrderBy("filterName");
        return baseCriteria;
    };

    function getStatusMessages(errorMessage) {
        var statusMessages = [
            createError(500, errorMessage),
            createError(401, "Acesso não autorizado (unauthorized)."),
            createError(404, "Pessoa não encontrada.")
        ];

        return statusMessages;
    };

    service.insertPeople = insertPeople;
    service.updatePeople = updatePeople;
    service.getPeople = getPeople;
    service.getPeopleById = getPeopleById;
    service.deletePeople = deletePeople;
    return service;
};