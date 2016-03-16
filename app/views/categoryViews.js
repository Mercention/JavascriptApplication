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
    function showCategory(selector,data){
        app.templateLoader('partials/category.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $.sammy(function () {
                this.trigger('show-albums', {categoryId: data._id})
            });

        })
    }

    return {
        load: function() {
            return {
                showCategories: showCategories,
                showCategory: showCategory
            }
        }
    }
}());