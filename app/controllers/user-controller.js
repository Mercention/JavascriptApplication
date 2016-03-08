var app = app || {};

app.userController = (function () {
    function UserController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    UserController.prototype.loadLoginPage = function (selector) {
        this.viewBag.loginView.loadLoginView(selector);
    };

    UserController.prototype.loadRegisterPage = function (selector) {
        this.viewBag.registerView.loadRegisterView(selector);
    };

    UserController.prototype.login = function (username, password) {
        return this.model.login(username, password)
            .then(function (loginData) {
                $('#welcomeMenu').text('Welcome, ' + username);
                window.location.replace('#/home/');
                //Noty.success('You have successfully logged in!', 'top');
            }, function (error) {
                //Noty.error(error.responseJSON.error, 'top');
            });
    };

    UserController.prototype.register = function (username, pass, email) {
        return this.model.signUp(username, pass, email)
            .then(function () {
                $('#welcomeMenu').text('Welcome, ' + username);
                window.location.replace('#/home/');
                //Noty.success('Registration successful! Welcome!', 'top');
            }, function (error) {
                //Noty.error(error.responseJSON.error, 'top');
            });
    };

    UserController.prototype.logout = function () {
        return this.model.logout()
            .then(function () {
                $('#welcomeMenu').text('');
                window.location.replace('#/');
                //Noty.success('Goodbye!', 'top');
            }, function (error) {
                //Noty.error(error.responseJSON.error, 'top');
            });
    };

    return {
        load: function (model, views) {
            return new UserController(model, views);
        }
    }
})();