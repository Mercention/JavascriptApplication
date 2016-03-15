var app = app || {};

app.photoViews = (function () {
    function showPhotos(selector, data) {
        app.templateLoader('partials/photos.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#add-picture-btn').on('click', function () {
                $('#upload-button').on('click', function () {
                    if ($('#picture').val() != undefined) {
                        var title = $('#pictureTitle').val();
                        var type = $('#picture')[0].files[0].type;
                        var data = base64($('#picture'), function (data) {
                            Sammy(function () {
                                this.trigger('add-photo', {title: title, type: type, data: data.base64})
                            });
                        });
                    }
                });

            })
        })
    }

    return {
        load: function () {
            return {
                showPhotos: showPhotos
            }
        }
    }
}());

function base64(file, callback) {
    var pictureFile = {};

    function readerOnload(e) {
        var base64 = btoa(e.target.result);
        pictureFile.base64 = base64;
        callback(pictureFile)
    }

    var reader = new FileReader();
    reader.onload = readerOnload;

    var file = file[0].files[0];
    pictureFile.filetype = file.type;
    pictureFile.size = file.size;
    pictureFile.filename = file.name;
    reader.readAsBinaryString(file);
}