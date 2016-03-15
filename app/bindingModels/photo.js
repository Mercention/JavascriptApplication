var PhotoInputModel = (function () {
    function PhotoInputModel(id, title, type, data) {
        this._id = id;
        this.title = title;
        this.type = type;
        this.data = data;
    }

    return PhotoInputModel;
}());