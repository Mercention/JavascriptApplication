var app = app || {};

app.photoModule = (function(){
    function PhotoModule() {
        this.serviceUrl = app.requester.baseUrl
            + 'appdata/'
            + app.requester.appId
            + "/Photos";
    }

    PhotoModule.prototype.addPhoto = function (data){
        return app.requester.post(this.serviceUrl,data,true)
    };

    PhotoModule.prototype.getAllPhotos = function(){
        return app.requester.get(this.serviceUrl,true)
    };

    return {
        load: function () {
            return new PhotoModule();
        }
    };
}());