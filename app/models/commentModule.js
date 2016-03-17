var app = app || {};

app.commentModule = (function() {
    function CommentModule() {
        this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId + '/Comments';
    }

    CommentModule.prototype.getComments = function(pId, collectionName) {
        var allComentsUrl = this.serviceUrl + '/?query=';
        if (collectionName === 'Albums') {
            allComentsUrl += JSON.stringify({"album._id":pId});
        } else {
            allComentsUrl += JSON.stringify({"photo._id":pId});
        }

        allComentsUrl += '&resolve=madeBy';//'&resolve_depth=1';

        return app.requester.get(allComentsUrl, true);
    }

    CommentModule.prototype.addComment = function(data) {
        return app.requester.post(this.serviceUrl, data, true);
    }

    return {
        load: function () {
            return new CommentModule();
        }
    };
}());