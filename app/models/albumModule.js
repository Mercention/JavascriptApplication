var app = app || {};

app.albumModule = (function () {
    function AlbumModule() {
        this.serviceUrl = app.requester.baseUrl
            + 'appdata/'
            + app.requester.appId
            + "/Albums";
    }

    AlbumModule.prototype.addAlbum = function (data) {
        return app.requester.post(this.serviceUrl, data, true);
    };

    AlbumModule.prototype.getAllAlbums = function (categoryId) {
        var query = '?query={"category._id":"' + categoryId + '"}';
        return app.requester.get(this.serviceUrl + query, true);
    };

    AlbumModule.prototype.getAlbum = function (albumId) {
        return app.requester.get(this.serviceUrl + '/' + albumId, true);
    };
    AlbumModule.prototype.getMyAlbums = function (id) {
        return app.requester.get(this.serviceUrl + '/?query={"_acl.creator":"' + id + '"}', true);
    };

    AlbumModule.prototype.getLastAlbums = function () {
        return app.requester.get(this.serviceUrl + '/?query={}&sort={"_kmd.ect":-1}&limit=5', true);
    };

    return {
        load: function () {
            return new AlbumModule();
        }
    };
}());