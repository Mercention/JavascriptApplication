var app = app || {};

app.categoryController = (function() {
    function CategoryController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    CategoryController.prototype.getAllCategories = function(selector) {
        var _this =this;

        this._model.getAllCategories()
            .then(function (categories) {
                var result = {
                    categories: []
                };

               categories.forEach(function(category){
                   result.categories.push(new CategoryInputModel(category._id, category.title));
               });

                _this._viewBag.showCategories(selector, result);
            }).done();
    };

    CategoryController.prototype.addCategory = function(data) {
        var _this = this;

        var categoryOutputModel = {
            title: data.title
        };

        this._model.addCategory(categoryOutputModel)
            .then(function() {
                _this.getAllCategories();
            })
    };

    return {
        load: function(model, viewBag) {
            return new CategoryController(model, viewBag);
        }
    };
}());