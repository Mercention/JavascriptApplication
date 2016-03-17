var app = app || {};

app.commentViews = (function(){
    function showPhotoComments(selector, data, photoId) {
        app.templateLoader('partials/comments.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);

            $('#photo-comments').on('click', '#add-comment-btn', function () {
                var inputData = {
                    text: $("#comment-text").val(),
                    author: sessionStorage['username'],
                    madeBy: {
                        "_type": "KinveyRef",
                        "_id": sessionStorage['userId'],
                        "_collection": "Users"
                    },
                    photo: {
                        "_type": "KinveyRef",
                        "_id": photoId,
                        "_collection": "Photos"
                    }
                };

                $.sammy(function () {
                    this.trigger('add-photo-comment', inputData);
                });
            });
        });
    }

    function showAlbumComments(selector, data, albumId) {

        app.templateLoader('partials/comments.html', function (template) {
            debugger
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);

            $('#album-comments').on('click', '#add-comment-btn', function () {

                var inputData = {
                    text: $("#comment-text").val(),
                    author:sessionStorage['username'],
                    madeBy: {
                        "_type": "KinveyRef",
                        "_id": sessionStorage['userId'],
                        "_collection": "Users"
                    },
                    album: {
                        "_type": "KinveyRef",
                        "_id": albumId,
                        "_collection": "Albums"
                    }
                };

                $.sammy(function () {
                    this.trigger('add-album-comment', inputData);
                });
            });
        });
    }

    return {
        load: function() {
            return {
                showPhotoComments: showPhotoComments,
                showAlbumComments: showAlbumComments
            };
        }
    };
}());