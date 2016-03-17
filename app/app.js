var app = app || {};

(function () {
    app.requester.config('kid_Zke1utvXkZ', 'a5704de87fa34508aaa5d8548f3b72a0');

    //var countriesRepo = app.collectionRepo.load('countries');
    //var townsRepo = app.collectionRepo.load('towns');
    //townsRepo.add({name:'Plovdiv', country:'Bulgaria'});

    var userModule = app.userModule.load(),
        categoryModule = app.categoryModule.load(),
        albumModule = app.albumModule.load(),
        photoModule = app.photoModule.load(),
        commentModule = app.commentModule.load(),

        homeViews = app.homeViews.load(),
        userViews = app.userViews.load(),
        categoryViews = app.categoryViews.load(),
        albumViews = app.albumViews.load(),
        photoViews = app.photoViews.load(),
        commentViews = app.commentViews.load(),

        homeController = app.homeController.load(homeViews,albumModule),
        userController = app.userController.load(userModule, userViews),
        categoryController = app.categoryController.load(categoryModule, categoryViews),
        albumController = app.albumController.load(albumModule, albumViews),
        photoController = app.photoController.load(photoModule,photoViews),
        commentController = app.commentController.load(commentModule, commentViews);

    var selector = '.container',
        photosSelector = '#photos',
        photoCommentsSelector = '#photo-comments',
        albumCommentsSelector = '#album-comments';

    app.router = $.sammy(function () {
        //this.use('Mustache');
        function haveLoggedInUser() {
            var userId = sessionStorage['userId'];
            return userId ? true : false;
        }

        this.before(function () {
            if (haveLoggedInUser()) {
                $('#menu').show();
            } else {
                $('#menu').hide();
            }
        });

        this.before('#/', function () {
            if (haveLoggedInUser()) {
                this.redirect('#/home/');

                return false;
            }
        });

        this.before('#/home/', function () {
            if (!haveLoggedInUser()) {
                this.redirect('#/');

                return false;
            }
        });

        this.before('#/logout/', function () {
            if (!haveLoggedInUser()) {
                this.redirect('#/');

                return false;
            }
        });

        this.get('#/', function () {
            homeController.welcomeScreen(selector);
        });

        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });

        this.get('#/home/', function () {
            homeController.homeScreen(selector);
        });

        this.get('#/category/', function () {
            categoryController.getAllCategories(selector);
        });

        this.get('#/category/photos', function () {
            photoController.getAllPhotos(selector);
        });

        this.get('#/add-album', function () {
            albumController.loadAddAlbumPage(selector);
        });

        this.get('#/category/:id', function () {
            var categoryId = this.params['id'];
            categoryController.getCategory(selector, categoryId);
        });

        this.get('#/album/:id', function () {
            var albumId = this.params['id'];
            albumController.getAlbum(selector, albumId);
        });

        this.bind('login', function (e, data) {
            userController.login(data.username, data.password);
        });

        this.bind('register', function (e, data) {
            userController.register(data.username, data.password, data.email);
        });
        this.bind('add-category', function (e, data) {
            categoryController.addCategory(data);
        });

        this.bind('add-album', function (e, data) {
            albumController.addAlbum(data);
        });
        this.bind('show-albums',function(e, data){
            albumController.getAllAlbums(selector,data.categoryId)
        });


        this.bind('show-photos',function(e, data){
            photoController.getAllPhotos(photosSelector,data)
        });

        this.bind('add-photo', function (e, data) {
            photoController.addPhoto(data);
        });
        this.bind('delete-photo', function (e, data) {
            photoController.removePhoto(data);
        });

        this.bind('show-photo-comments', function(e, photoId) {
            commentController.getAllPhotoComments(photoCommentsSelector, photoId);
        });

        this.bind('show-album-comments', function(e, albumId) {
            commentController.getAllAlbumComments(albumCommentsSelector, albumId);
        });

        this.bind('add-photo-comment', function(e, data) {
           commentController.addPhotoComment(data);
        });

        this.bind('add-album-comment', function(e, data) {
            commentController.addAlbumComment(data);
        });

        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });
    });

    app.router.run('#/');
}());