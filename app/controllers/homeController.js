var app = app || {};

app.homeController = (function () {
    function HomeController(views, model) {
        this.viewBag = views;
        this._model = model;
    }

    HomeController.prototype.welcomeScreen = function (selector) {
        this.viewBag.welcomeView.loadWelcomeView(selector);
    };

    HomeController.prototype.homeScreen = function (selector) {
        var _this = this;
        var userId = sessionStorage.getItem('userId');
        var result = {
            myAlbums: [],
            lastAlbums:[],
            username: sessionStorage['username']
        };
        this._model.getMyAlbums(userId)
            .then(function (albums) {
                albums.forEach(function (album) {
                    result.myAlbums.push(new AlbumInputModel(album._id, album.title));
                });

                _this.viewBag.homeView.loadHomeView(selector, result);
            }).done();

        this._model.getLastAlbums()
            .then(function (albums) {
                albums.forEach(function (album) {
                    result.lastAlbums.push(new AlbumInputModel(album._id, album.title));
                });

                debugger
                _this.viewBag.homeView.loadHomeView(selector, result);
            }).done();


    };

    HomeController.prototype.getMyAlbums = function (selector) {

    };

    return {
        load: function (views, model) {
            return new HomeController(views, model);
        }
    }
})();