var isBlank = require("is-blank");

module.exports = function() {
    var service = {};

    function find(options) {
        var req = options.req;
        var res = options.res;
        var baseCriteria = options.baseCriteria;
        var statusMessages = options.statusMessages;

        var model = baseCriteria.model;
        model.find(baseCriteria.query, baseCriteria.fields)
            .sort(baseCriteria.orderBy)
            .skip(parseInt(baseCriteria.pageIndex) * parseInt(baseCriteria.pageSize))
            .limit(parseInt(baseCriteria.pageSize))
            .exec()
            .then(function(result) {
                options.result = result;
                callBackFind(options);
            })
            .catch(function(error) {
                options.error = error;
                callBackError(options);
            });
    };

    function callBackFind(options) {
        var req = options.req;
        var res = options.res;
        var result = options.result;

        if (isBlank(result) && !isBlank(req.params.id)) {
            options.status = 404;
            res.status(options.status).json({msg : getStatusMessage(options)});
            return;
        }

        res.status(200).json(result);
    };

    function remove(options, callBack) {
        var res = options.res;
        var baseCriteria = options.baseCriteria;

        baseCriteria.model.remove(baseCriteria.query).exec()
            .then(function() {
                if (callBack) {
                    callBack();
                    return;
                }

                res.status(204).end();
            }).catch(function(error) {
                options.error = error;
                callBackError(options);
            });
    };

    function insert(options) {
        var res = options.res;
        var baseCriteria = options.baseCriteria;
        var statusMessages = options.statusMessages;

        baseCriteria.model.create(baseCriteria.values)
            .then(function(result) {
                res.status(201).json({_id : result._id});
            })
            .catch(function(error) {
                options.error = error;
                callBackError(options);
            });
    };

    function update(options) {
        var res = options.res;
        var baseCriteria = options.baseCriteria;
        var statusMessages = options.statusMessages;

        delete baseCriteria.values.id;

        baseCriteria.model.findByIdAndUpdate(baseCriteria.query, baseCriteria.values).exec()
            .then(function(result) {
                res.status(204).end();
            })
            .catch(function(error) {
                options.error = error;
                callBackError(options);
            });
    };

    function callBackError(options) {
        var res = options.res;
        var error = options.error;

        options.status = 500;
        res.status(options.status).json({msg : getStatusMessage(options) + error});
    };

    function getStatusMessage(options) {
        var statusMessages = options.statusMessages;
        var status = options.status;

        var statusMessage = statusMessages.filter(function(statusMessage) {
            if (statusMessage.status === status) {
                return statusMessage.message;
            }
        });

        if (isBlank(statusMessage)) {
            return "";
        }

        return statusMessage[0].message;
    }

    function getCount(baseCriteria) {
        var model = baseCriteria.model;
        return model.count(baseCriteria.query).exec();
    };

    service.find = find;
    service.remove = remove;
    service.insert = insert;
    service.update = update;
    service.getCount = getCount;
    service.getStatusMessage = getStatusMessage;
    return service;
};