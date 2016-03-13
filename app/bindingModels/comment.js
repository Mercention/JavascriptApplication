var CommentInputModel = (function() {
    function CommentInputModel(id,content,photoId) {
        this._id = id;
        this.content = content;
        this.photoId = photoId;
    }

    return CommentInputModel;
}());