var app = app || {};

app.photoViews = (function(){
    function showPhotos(selector, data) {
        app.templateLoader('partials/photos.html', function (template) {
            debugger
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#addPhoto').on('click', function () {

                $("#addNewPhoto").on("click",function(){
                    //var inputData = {
                    //    title : $("#categoryTitle").val()
                    //};
                    //$.sammy(function () {
                    //
                    //    this.trigger('add-photo', {title: inputData.title})
                    //});
                });
            })
        })
    }

    return {
        load: function() {
            return {
                showPhotos: showPhotos
            }
        }
    }
}());