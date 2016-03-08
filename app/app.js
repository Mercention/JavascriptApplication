var app = app || {};

(function () {
    app.requester.config('kid_Zke1utvXkZ', 'a5704de87fa34508aaa5d8548f3b72a0');

    //var countriesRepo = app.collectionRepo.load('countries');
    //var townsRepo = app.collectionRepo.load('towns');
    //townsRepo.add({name:'Plovdiv', country:'Bulgaria'});

    var userModule = app.userModule.load(),

        homeViews = app.homeViews.load(),
        userViews = app.userViews.load(),

        homeController = app.homeController.load(homeViews),
        userController = app.userController.load(userModule, userViews);

    var selector = '.container';

    app.router = $.sammy(function () {
        //this.use('Mustache');

        this.before(function () {
            var userId = sessionStorage['userId'];

            if (userId) {
                $('#menu').show();
            } else {
                $('#menu').hide();
            }
        });

        this.before('#/', function () {
            var userId = sessionStorage['userId'];

            if (userId) {
                this.redirect('#/home/');

                return false;
            }
        });

        this.before('#/home/', function () {
            var userId = sessionStorage['userId'];

            if (!userId) {
                this.redirect('#/');

                return false;
            }
        });

        this.before('#/logout/', function () {
            var userId = sessionStorage['userId'];

            if (!userId) {
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

        this.bind('login', function (e, data) {
            userController.login(data.username, data.password);
        });

        this.bind('register', function (e, data) {
            userController.register(data.username, data.password, data.email);
        });
    });

    app.router.run('#/');
}());