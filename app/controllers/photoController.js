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
                    photos: []
                };

                photos.forEach(function (photo) {
                    result.photos.push(new PhotoInputModel(photo._id, photo.title, photo.type, photo.data));
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
                    result.photos.push(new PhotoInputModel(photo._id, photo.title, photo.type, photo.data));
                });

                _this._viewBag.showPhoto(selector, result);
            }).done();
    };

    PhotoController.prototype.addPhoto = function (data) {
        var _this = this;

        var photoOutputModel = {
            title: data.title,
            type: data.type,
            data: data.data
        };
        this._model.addPhoto(photoOutputModel)
            .then(function () {
                _this.getAllPhotos();
            })
    };

    PhotoController.prototype.removePhoto = function (data) {

    };

    return {
        load: function (model, viewBag) {
            return new PhotoController(model, viewBag);
        }
    };
}());