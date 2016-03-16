var app = app || {};

app.photoViews = (function () {
    function showPhotos(selector, data) {
        app.templateLoader('partials/photos.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('img').on("click", function () {
                $(this).clone().appendTo('div.modal-body');
                $('button.dismiss').on('click', function () {
                    $('div.modal-body').empty();
                });
            });
            $('#add-picture-btn').on('click', function () {
                //$('#picture').on('change',function(){
                //    var files = !!this.files ? this.files : [];
                //    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
                //
                //    if (/^image/.test( files[0].type)){ // only image file
                //        var reader = new FileReader(); // instance of the FileReader
                //        reader.readAsDataURL(files[0]); // read the local file
                //
                //        reader.onloadend = function(){ // set image data as background of div
                //            $("#imagePreview").css("background-image", "url("+this.result+")");
                //        }
                //    }
                //});//TODO fix this
                $('#upload-button').on('click', function () {
                    if ($('#picture').val() != undefined) {
                        var title = $('#pictureTitle').val();
                        var type = $('#picture')[0].files[0].type;
                        base64($('#picture'), function (data) {
                            Sammy(function () {
                                this.trigger('add-photo', {title: title, type: type, data: data.base64})
                            });
                        })
                    }
                });
            })
        })
    }

    function showPhoto(selector, data) {
        app.templateLoader('partials/')
    }

    return {
        load: function () {
            return {
                showPhotos: showPhotos,
                showPhoto: showPhoto
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