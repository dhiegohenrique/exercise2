var isBlank = require("is-blank");

function BaseCriteria() {
    this.pageSize = 10;
    this.pageIndex = 0;
};

BaseCriteria.prototype.setModel = function(model) {
    this.model = model;
}

BaseCriteria.prototype.setQuery = function(query) {
    this.query = query;
}

BaseCriteria.prototype.setOrderBy = function(orderBy) {
    this.orderBy = orderBy;
}

BaseCriteria.prototype.setPageSize = function(pageSize) {
    if (isBlank(pageSize)) {
        return;
    }

    this.pageSize = pageSize;
}

BaseCriteria.prototype.setPageIndex = function(pageIndex) {
    if (isBlank(pageIndex)) {
        return;
    }

    this.pageIndex = pageIndex;
}

BaseCriteria.prototype.setValues = function(values) {
    this.values = values;
}

BaseCriteria.prototype.setFields = function(fields) {
    this.fields = fields;
}

module.exports = function() {
    return BaseCriteria;
};