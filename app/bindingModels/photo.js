var PhotoInputModel = (function () {
    function PhotoInputModel(data) {
        this._id = data._id;
        this.title = data.title;
        this.data = data.data;
        this.album = data.album;
    }

    return PhotoInputModel;
}());