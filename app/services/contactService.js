var createError = require("http-errors");
var isBlank = require("is-blank");
var mongoSanitize = require("mongo-sanitize");

module.exports = function(app) {
    var service = {};
    var Contact = app.models.Contact;
    var baseService = app.services.baseService;

    function getOptions(req, res, errorMessage) {
        var options = {
            "req" : req,
            "res" : res,
            statusMessages : getStatusMessages(errorMessage)
        };

        return options;
    };

    function getStatusMessages(errorMessage) {
        var statusMessages = [
            createError(500, errorMessage),
            createError(401, "Acesso não autorizado (unauthorized)."),
            createError(404, "Contato não encontrado.")
        ];

        return statusMessages;
    };

    function getBaseCriteria() {
        var baseCriteria = new app.criteria.BaseCriteria();
        baseCriteria.setModel(Contact);
        baseCriteria.setOrderBy("filterName");
        return baseCriteria;
    };

    function insertContact(req, res) {
        var options = getOptions(req, res, "Erro ao criar contato: ");

        validate(options, () => {
            var baseCriteria = getBaseCriteria();
            baseCriteria.setValues(getValues(options.req));

            options.baseCriteria = baseCriteria;
            baseService.insert(options);
        });
    };

    function updateContact(req, res) {
        var options = getOptions(req, res, "Erro ao atualizar contato: ");

        validate(options, () => {
            var baseCriteria = getBaseCriteria();
            baseCriteria.setQuery({"_id" : options.req.params.id});
            baseCriteria.setValues(getValues(options.req));

            options.baseCriteria = baseCriteria;
            baseService.update(options);
        });
    };

    function getValues(req) {
        var values = {};

        if (!isBlank(req.body.name)) {
            values.name = req.body.name;
        }

        if (!isBlank(req.body.phone)) {
            values.phone = req.body.phone;
        }

        if (!isBlank(req.body.email)) {
            values.email = req.body.email;
        }

        if (!isBlank(req.body.whatsapp)) {
            values.whatsapp = req.body.whatsapp;
        }

        if (!isBlank(req.user.personId)) {
            values.personId = req.user.personId;
        }

        return values;
    };

    function validateContactFound(contactId, callback) {
        if (!contactId) {
            callback(null, true);
            return;
        }

        var baseCriteria = getBaseCriteria();
        baseCriteria.setQuery({"_id" : contactId});

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

    function validateContactId(options, callback) {
        var req = options.req;
        var res = options.res;

        var contactId = req.params.id;
        if (!contactId) {
            callback();
            return;
        }

        function callbackHasContactByPerson(error, count) {
            options.error = error;
            options.count = count;

            if (validateCallback(options)) {
                callback();
                return;
            }

            options.status = 401;
            res.status(options.status).json({msg : baseService.getStatusMessage(options)});
        };

        options.contactId = contactId;
        options.personId = req.user.personId;
        hasContactByPerson(options, callbackHasContactByPerson);
    };

    function hasContactByPerson(options, callback) {
        var contactId = options.contactId;
        var personId = options.personId;

        var baseCriteria = getBaseCriteria();
        baseCriteria.setQuery({"_id" : contactId, "personId" : personId});

        baseService.getCount(baseCriteria)
            .then(function(count) {
                callback(null, count);
            })
            .catch(function(error) {
                callback(error, null);
            });
    };

    function validate(options, done) {
        function callbackContactFound(error, count) {
            options.error = error;
            options.count = count;

            if (!validateCallback(options)) {
                return;
            }

            validateContactId(options, done);
        };

        var req = options.req;
        req.params.id = mongoSanitize(req.params.id);
        validateContactFound(req.params.id, callbackContactFound);
    }

    function getContactsByPersonId(req, res) {
        var options = getOptions(req, res, "Não foi possível recuperar os contatos.");

        validate(options, () => {
            var baseCriteria = getBaseCriteria();
            baseCriteria.setQuery({"personId" : options.req.user.personId});
            baseCriteria.setFields("_id name");

            var query = options.req.query;
            if (query && query.index) {
                baseCriteria.setPageIndex(query.index);
            }

            if (query && query.size) {
                baseCriteria.setPageSize(query.size);
            }

            options.baseCriteria = baseCriteria;
            baseService.find(options);
        });
    };

    function getContactById(req, res) {
        var options = getOptions(req, res, "Erro ao recuperar contato pelo ID.");

        validate(options, () => {
            var baseCriteria = getBaseCriteria();
            baseCriteria.setQuery({"_id" : options.req.params.id});
            baseCriteria.setFields("_id name phone email whatsapp personId");

            options.baseCriteria = baseCriteria;
            baseService.find(options);
        });
    };

    function deleteContactById(req, res) {
        var options = getOptions(req, res, "Erro ao deletar contato pelo ID");

        validate(options, () => {
            var baseCriteria = getBaseCriteria();
            baseCriteria.setQuery({"_id" : options.req.params.id});

            options.baseCriteria = baseCriteria;
            baseService.remove(options);
        });
    };

    function deleteContactsByPersonId(personId, callback) {
        personId = mongoSanitize(personId);
        Contact.remove({"personId" : personId}).exec()
            .then(function() {
                callback();
            })
            .catch(function(error){
                callback(error);
            });
    };

    service.insertContact = insertContact;
    service.updateContact = updateContact;
    service.getContactsByPersonId = getContactsByPersonId;
    service.getContactById = getContactById;
    service.deleteContactById = deleteContactById;
    service.deleteContactsByPersonId = deleteContactsByPersonId;
    return service;
};