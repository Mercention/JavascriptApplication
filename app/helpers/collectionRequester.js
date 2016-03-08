var app = app || {};

app.collectionRequester = (function () {
    function CollectionRequester(collection) {
        this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId + '/' + collection;
    }

    CollectionRequester.prototype.getAll = function () {
        return app.requester.makeRequest('GET', this.serviceUrl, null, true);
    }

    CollectionRequester.prototype.getById = function (id) {
        return app.requester.makeRequest('GET', this.serviceUrl + '/' + id, null, true);
    }

    //CollectionRequester.prototype.getWithQuery = function (filters, modifiers) {
    //    modifiers = '&' + modifiers || '';
    //    return app.requester.makeRequest('GET', this.serviceUrl + '/?query=' + filters + modifiers, null, true);
    //}

    return CollectionRequester;
}());