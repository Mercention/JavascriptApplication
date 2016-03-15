var app = app || {};

app.photoController = (function() {
    function PhotoController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    PhotoController.prototype.getAllPhotos = function(selector) {
        var _this =this;

        this._model.getAllPhotos()
            .then(function (photos) {
                var result = {
                    photos: []
                };

                photos.forEach(function(photo){
                    result.photos.push(new PhotoInputModel(photo._id, photo.title,photo.data));
                });

                _this._viewBag.showPhotos(selector, result);
            }).done();
    };

    PhotoController.prototype.addPhoto = function(data) {
        var _this = this;

        var photoOutputModel = {
            title: data.title
        };

        this._model.addPhoto(photoOutputModel)
            .then(function() {
                _this.getAllPhotos();
            })
    };

    return {
        load: function(model, viewBag) {
            return new PhotoController(model, viewBag);
        }
    };
}());