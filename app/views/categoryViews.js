var app = app || {};

app.categoryViews = (function(){
    function showCategories(selector, data) {
        app.templateLoader('partials/category.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            var buttons =  $(".categoryButton");

            for (var i = 0; i < buttons.length; i++) {
                $(buttons[i]).on('click',function(){
                    var id = $(this).attr('data-id');

                    $.sammy(function(){
                        this.trigger('show-albums',{categoryId:id,categoryCollection:"Categories",category:"category"})
                    })
                })

            }

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