var app = app || {};

app.userViews = (function () {
    function UserViews() {
        this.loginView = {
            loadLoginView: loadLoginView
        };

        this.registerView = {
            loadRegisterView: loadRegisterView
        };
    }

    function loadLoginView(selector) {
        app.templateLoader('partials/login.html', function (template) {
            var outHtml = Mustache.render(template);

            $(selector).html(outHtml);
        }).then(function () {
            $('#loginButton').click(function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                $.sammy(function () {
                    this.trigger('login', {username: username, password: password});
                });

                return false;
            });
        });
    }

    function loadRegisterView(selector) {
        app.templateLoader('partials/register.html', function (template) {
            var outHtml = Mustache.render(template);

            $(selector).html(outHtml);
        }).then(function () {
            $('#registerButton').click(function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    email = $('#email').val();

                $.sammy(function () {
                    this.trigger('register', { username: username, password: password, email: email });
                });

                return false;
            });
        });
    }

    return {
        load: function () {
            return new UserViews();
        }
    }
})();