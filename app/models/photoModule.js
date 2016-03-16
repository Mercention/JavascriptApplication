var app = app || {};

app.photoModule = (function () {
    function PhotoModule() {
        this.serviceUrl = app.requester.baseUrl
            + 'appdata/'
            + app.requester.appId
            + '/Photos/?query={"album":{"_type":"KinveyRef","_id":"'
            + '56e912ac1b6974a8020340bc'
            + '","_collection":"Albums"}}&limit=8&skip=0'; // TODO made me dynamic and add paging to page
    }

    PhotoModule.prototype.addPhoto = function (data) {
        return app.requester.post(this.serviceUrl, data, true)
    };

    PhotoModule.prototype.getAllPhotos = function () {
        return app.requester.get(this.serviceUrl, true)
    };

    return {
        load: function () {
            return new PhotoModule();
        }
    };
}());