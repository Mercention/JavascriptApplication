var app = app || {};

app.homeController = (function () {
    function HomeController(views,model) {
        this.viewBag = views;
        this._model = model;
    }

    HomeController.prototype.welcomeScreen = function (selector) {
        this.viewBag.welcomeView.loadWelcomeView(selector);
    };

    HomeController.prototype.homeScreen = function (selector) {
        var _this = this;
        this._model.getHomePageAlbums()
            .then(function(albums){

                var result = {
                    albums: [],
                    username: sessionStorage['username']
                };

                albums.forEach(function(album){
                    result.albums.push(new AlbumInputModel(album._id, album.title));
                });


                _this.viewBag.homeView.loadHomeView(selector, result);
            }).done();


    };

    HomeController.prototype.getHomePageAlbums = function(selector){

    }

    return {
        load: function (views,model) {
            return new HomeController(views,model);
        }
    }
})();