var app = app || {};

app.albumViews = (function () {
    function showAlbums(selector, data) {
    }

    function showAlbum(selector, data) {
        app.templateLoader('partials/album.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
        }).then(function () {
            $('#add-picture-btn').on('click', function () {
                var data = {
                    albumId: $('#album-id').val()
                }

                /*$.sammy(function () {
                 this.trigger('add-picture', data);
                 });*/
            });

            $('#back-btn').on('click', function () {
                /*$.sammy(function () {
                 this.trigger('show-album', {title: "Albums"});
                 });*/
            });
        }).done();
    }

    function addAlbum(selector) {
        app.templateLoader('partials/addAlbum.html', function (template) {
            var rendered = Mustache.render(template);
            $(selector).html(rendered);
        }).then(function () {
            $('#add-album-btn').on('click', function () {
                var data = {
                    title: $('#title').val()
                };

                $.sammy(function () {
                    this.trigger('add-album', data);
                });
            });

            $('#back-btn').on('click', function () {
                /*$.sammy(function () {
                 this.trigger('show-categories', {title: "Albums"});
                 });*/
            });
        }).done();
    }

    return {
        load: function () {
            return {
                showAlbum: showAlbum,
                addAlbum: addAlbum
            };
        }
    };
}());