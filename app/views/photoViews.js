var app = app || {};

app.photoViews = (function () {
    function showPhotos(selector, data) {
        var albumId = data.albumId;
        app.templateLoader('partials/photos.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);

            $('img').on("click", function () {
                var _this = this;
                //$(this).clone().appendTo('div#picture-body');
                //$('button.dismiss').on('click', function () {
                //    $('div#picture-body').empty();
                //});

                var current = $(this).clone();
                $("#picture-body").html(current);

                var id = $(_this).attr("data-id");
                $("#deletePicture").on("click",function(){
                    $.sammy(function () {
                        var data = {
                            photoId: id,
                            albumId:albumId
                        }
                        this.trigger('delete-photo',data);
                    });
                });

                $.sammy(function () {
                    this.trigger('show-photo-comments', id);
                });
            });

            $('#add-picture-btn').on('click', function () {
                $('button.clear-on-close').on('click', function () {
                    $('input').each(function () {
                        $(this).val(null);
                    });
                    $('#imagePreview').empty();
                });

                $('#picture').on('change', function () {
                    var files = !!this.files ? this.files : [];
                    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

                    if (/^image/.test(files[0].type)) { // only image file
                        var reader = new FileReader(); // instance of the FileReader
                        reader.readAsDataURL(files[0]);
                        Q.all(reader).then(function (reader) {
                            $("#imagePreview").html('<img " src=\'' + reader.result + '\' class="img-thumbnail picture-preview"/>'); // read the local file
                            $('#upload-button').on('click', function () {
                                var title = $('#pictureTitle').val();
                                if (title == "") {
                                    title = 'no title';
                                }

                                var inputData = {
                                    title : title,
                                    data:reader.result,
                                    album:{
                                        _type : "KinveyRef",
                                        _id: data.albumId,
                                        _collection:"Albums"
                                    }
                                };
                                $.sammy(function () {
                                    this.trigger('add-photo', inputData);
                                });
                            });
                        }).done();
                    }
                });
            });

            $.sammy(function () {
                this.trigger('show-album-comments', albumId);
            });
        });
    }

    function showPhoto(selector, data) {
        //app.templateLoader('partials/')
    }

    return {
        load: function () {
            return {
                showPhotos: showPhotos,
                showPhoto: showPhoto
            };
        }
    };
}());