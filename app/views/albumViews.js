var app = app || {};

app.albumViews = (function () {
    //function showAlbums(selector, data) {
    //}

    function showAlbums(selector, data, categoryId) {
        app.templateLoader('partials/albums.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#addAlbum').on('click', function () {

                $("#addNewAlbum").on("click",function(){

                    var inputData = {
                        title : $("#albumTitle").val(),
                        category:{
                            _id: categoryId,
                            _type : "KinveyRef",
                            collection:"Categories"
                        }
                    };
                    $.sammy(function () {
                        this.trigger('add-album',inputData )

                    });
                });
            })
        }).then(function (data) {
            $('#add-picture-btn').on('click', function () {
                var data = {
                    albumId: $('#album-id').val()
                };

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
                showAlbums: showAlbums,
                addAlbum: addAlbum
            };
        }
    };
}());