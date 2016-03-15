var app = app || {};

app.photoController = (function(){
    function PhotoController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    return {
        load: function(model, viewBag){
            return new PhotoController(model, viewBag);
        }
    };
}());