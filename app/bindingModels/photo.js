var PhotoInputModel = (function () {
    function PhotoInputModel(id, title, data, albumeId) {
        this._id = id;
        this.title = title;
        this.data = data;
        this.albumeId = albumeId;
    }

    return PhotoInputModel;
}());