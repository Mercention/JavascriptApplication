var app = app || {};

app.categoryViews = (function(){
    function showCategories(selector, data) {
        app.templateLoader('partials/category.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#addCategory').on('click', function () {

                $("#addNewCategory").on("click",function(){
                    var inputData = {
                        title : $("#categoryTitle").val()
                    };
                    $.sammy(function () {

                        this.trigger('add-category', {title: inputData.title})
                    });
                });
            })
        })
    }

    return {
        load: function() {
            return {
                showCategories: showCategories
            }
        }
    }
}());