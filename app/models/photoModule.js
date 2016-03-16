var app = app || {};

app.photoModule = (function () {
    function PhotoModule() {
        this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId + '/Photos';
    }

    PhotoModule.prototype.addPhoto = function (data) {
        return app.requester.post(this.serviceUrl, data, true)
    };

    PhotoModule.prototype.removePhoto = function (data) {
        var photoUrl = this.serviceUrl + '?query={"_id":"' + id + '"}';
        return app.requester.delete(photoUrl, true)
    };

    PhotoModule.prototype.getAllPhotos = function (albumId) {
        var allPhotosUrl = this.serviceUrl
            + '/?query={"album":{"_type":"KinveyRef","_id":"'
            + albumId
            + '","_collection":"Albums"}}&limit=8&skip=0'; // TODO made me dynamic and add paging to page
        return app.requester.get(allPhotosUrl, true)
    };

    PhotoModule.prototype.getPhoto = function (id) {
        var photoUrl = this.serviceUrl + '/' + id;
        return app.requester.post(photoUrl, true);
    };

    return {
        load: function () {
            return new PhotoModule();
        }
    };
}());