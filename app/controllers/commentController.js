var app = app || {};

app.commentController = (function(){
    function CommentController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    CommentController.prototype.addPhotoComment = function(data) {
        //var _this = this;

        this._model.addComment(data, 'Photos')
            .then(function (d) {
                $.sammy(function () {
                    this.trigger('show-photo-comments', d.photo._id);
                });
            });
    }

    CommentController.prototype.addAlbumComment = function(data) {
        //var _this = this;

        this._model.addComment(data, 'Albums')
            .then(function (d) {
                $.sammy(function () {
                    this.trigger('show-album-comments', d.album._id);
                });
            });
    }

    CommentController.prototype.getAllPhotoComments = function(selector, photoId) {
        var _this = this;

        this._model.getComments(photoId, 'Photos')
            .then(function (comments) {
                var result = {
                    comments: []
                };

                comments.forEach(function(comment){
                    result.comments.push(comment);
                });

                _this._viewBag.showPhotoComments(selector, result, photoId);
            }).done();
    }

    CommentController.prototype.getAllAlbumComments = function(selector, albumId) {
        var _this = this;

        this._model.getComments(albumId, 'Albums')
            .then(function (comments) {
                var result = {
                    comments: []
                };

                comments.forEach(function(comment){
                    result.comments.push(comment);
                });

                _this._viewBag.showAlbumComments(selector, result, albumId);
            }).done();
    }

    return {
        load: function(model, viewBag){
            return new CommentController(model, viewBag);
        }
    };
}());