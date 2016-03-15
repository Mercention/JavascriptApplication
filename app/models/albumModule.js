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

    AlbumModule.prototype.getAllAlbums = function () {
        return app.requester.get(this.serviceUrl, true);
    };

    AlbumModule.prototype.getAlbum = function (albumId) {
        return app.requester.get(this.serviceUrl + '/' + albumId, true);
    };

    return {
        load: function () {
            return new AlbumModule();
        }
    };
}());