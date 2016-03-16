var PhotoInputModel = (function () {
    function PhotoInputModel(id, title, type, data, albumeId) {
        this._id = id;
        this.title = title;
        this.type = type;
        this.data = data;
        this.albumeId = albumeId;
    }

    return PhotoInputModel;
}());