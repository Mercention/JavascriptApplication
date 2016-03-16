var app = app || {};

app.photoController = (function () {
    function PhotoController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    PhotoController.prototype.getAllPhotos = function (selector, albumId) {
        var _this = this;

        this._model.getAllPhotos(albumId)
            .then(function (photos) {
                var result = {
                    photos: [],
                    albumId:albumId
                };

                photos.forEach(function (photo) {
                    result.photos.push(new PhotoInputModel(photo));
                });

                _this._viewBag.showPhotos(selector, result);
            }).done();
    };

    PhotoController.prototype.getPhoto = function (selector, id) {
        var _this = this;

        this._model.getPhoto(id)
            .then(function (photos) {
                var result = {
                    photos: []

                };

                photos.forEach(function (photo) {

                    result.photos.push(new PhotoInputModel(photo));
                });

                _this._viewBag.showPhoto(selector, result);
            }).done();
    };

    PhotoController.prototype.addPhoto = function (data) {
        var _this = this;

        this._model.addPhoto(data)
            .then(function () {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/album/' + data.album._id});
                });
            })
    };

    PhotoController.prototype.removePhoto = function (data) {
        debugger
        this._model.removePhoto(data.photoId)
            .then(function () {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/album/' + data.albumId});
                });
            });
    };

    return {
        load: function (model, viewBag) {
            return new PhotoController(model, viewBag);
        }
    };
}());