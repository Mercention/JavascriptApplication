var app = app || {};

app.commentController = (function(){
    function CommentController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    return {
        load: function(model, viewBag){
            return new CommentController(model, viewBag);
        }
    };
}());