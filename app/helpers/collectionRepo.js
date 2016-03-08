var app = app || {};

app.collectionRepo = (function () {
    function CollectionRepo(collection) {
        this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId + '/' + collection;
    }

    CollectionRepo.prototype.getAll = function () {
        return app.requester.makeRequest('GET', this.serviceUrl, null, true);
    }

    CollectionRepo.prototype.getById = function (id) {
        return app.requester.makeRequest('GET', this.serviceUrl + '/' + id, null, true);
    }

    //CollectionRepo.prototype.getWithQuery = function (filters, sortBy, fields, limit, skip) {
    //    modifiers = modifiers ? '&' + modifiers : '';
    //    fields = fields ? '&fields=' + fields string.join : ''
    //    limit = !isNaN(limit) && limit ? '&limit=' + limit : '';
    //    skip = !isNaN(skip) && skip ? '&skip=' + skip : '';
    //    return app.requester.makeRequest('GET', this.serviceUrl + '/?query=' + filters + sortBy + fields + limit + skip, null, true);
    //}

    CollectionRepo.prototype.add = function (entry) {
        if (typeof entry === 'string') {
            entry = JSON.parse(entry);
        }

        return app.requester.makeRequest('POST', this.serviceUrl, entry, true);
    }

    //CollectionRepo.prototype.addMany = function (entries) {
    //    for (var i in entries) {
    //        app.requester.makeRequest('POST', this.serviceUrl, entries[i], true);
    //    }
    //}

    CollectionRepo.prototype.update = function (id, entry) {
        if (typeof entry === 'string') {
            entry = JSON.parse(entry);
        }

        return app.requester.makeRequest('UPDATE', this.serviceUrl + '/' + id, entry, true);
        //return app.requester.makeRequest('UPDATE', this.serviceUrl + '/' + entry._id, entry, true);
    }

    CollectionRepo.prototype.deleteWithQuery = function (id) {
        return app.requester.makeRequest('DELETE', this.serviceUrl + '/' + id, null, true);
    }

    CollectionRepo.prototype.delete = function (parameters) {
        return app.requester.makeRequest('DELETE', this.serviceUrl + '/?query=' + parameters, null, true);
    }

    //return CollectionRepo;
    return {
        load: function (collection) {
            return new CollectionRepo(collection);
        }
    };
}());