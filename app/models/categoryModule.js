var app = app || {};

app.categoryModule = (function(){
    function CategoryModule() {
        this.serviceUrl = app.requester.baseUrl
            + 'appdata/'
            + app.requester.appId
            + "/Categories";
    }

    CategoryModule.prototype.addCategory = function (data){
        return app.requester.post(this.serviceUrl,data,true)
    };

    CategoryModule.prototype.getAllCategories = function(){
        return app.requester.get(this.serviceUrl,true)
    };
    CategoryModule.prototype.getCategory = function(categoryId){
        return app.requester.get(this.serviceUrl + "/"+categoryId,true)
    };

    return {
        load: function () {
            return new CategoryModule();
        }
    };
}());