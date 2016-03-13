var app = app || {};

app.categoryViews = (function(){
    function showCategories(selector, data) {
        app.templateLoader('partials/category.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#addCategory').on('click', function () {
                app.templateLoader('partials/addCategory.html',function (template){
                    var rendered = Mustache.render(template);
                    var parent = $(this).parent(),
                        parentId = parent.attr('data-id');
                    $(selector).html(rendered);
                    $("#createCategory").on("click",function(){
                       var title = $("#title").val();
                        $.sammy(function () {
                            this.trigger('add-category', {parent:parentId,title: title})
                        });
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