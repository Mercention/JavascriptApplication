var app = app || {};

app.albumController = (function () {
    function AlbumController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    AlbumController.prototype.getAllAlbums = function () {
        var _this = this;

        this._model.getAllAlbums()
            .then(function (albums) {
                //albums = albums.map(function(e){
                //    return new AlbumViewModel(e);
                //});

                _this._viewBag.showAlbums(selector, albums);
            }).done();
    };

    AlbumController.prototype.getAlbum = function (selector, albumId) {
        var _this = this;

        this._model.getAlbum(albumId)
            .then(function (album) {
                //album = new AlbumViewModel(album);

                _this._viewBag.showAlbum(selector, album);
            }).done();
    };

    AlbumController.prototype.loadAddAlbumPage = function(selector){
        this._viewBag.addAlbum(selector);
    };

    AlbumController.prototype.addAlbum = function (data) {
        var _this = this;

        this._model.addAlbum(data)
            .then(function (album) {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/album/' + album._id});
                });
            }).done();
    };

    return {
        load: function (model, viewBag) {
            return new AlbumController(model, viewBag);
        }
    };
}());