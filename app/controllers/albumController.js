var app = app || {};

app.albumController = (function () {
    function AlbumController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    AlbumController.prototype.getAllAlbums = function (selector,categoryId) {
        var _this = this;

        this._model.getAllAlbums(categoryId)
            .then(function (albums) {
                var result = {
                    albums: []
                };

                albums.forEach(function(album){
                    result.albums.push(new AlbumInputModel(album._id, album.title));
                });

                _this._viewBag.showAlbums(selector, result , categoryId);
            }).done();
    };

    AlbumController.prototype.getAlbum = function (selector, albumId) {
        var _this = this;

        this._model.getAlbum(albumId)
            .then(function (album) {

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
                    this.trigger('redirectUrl', {url:'#/category/' + album.category._id});
                });
            }).done();
    };

    return {
        load: function (model, viewBag) {
            return new AlbumController(model, viewBag);
        }
    };
}());