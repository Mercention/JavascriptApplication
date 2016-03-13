var app = app || {};

app.homeViews = (function () {
    function HomeViews() {
        this.welcomeView = {
            loadWelcomeView: loadWelcomeView
        };

        this.homeView = {
            loadHomeView: loadHomeView
        };
    }

    function loadWelcomeView(selector) {
        app.templateLoader('partials/welcome.html', function (template) {
            var outHtml = Mustache.render(template);

            $(selector).html(outHtml);
        });
    }

    function loadHomeView(selector, data) {
        app.templateLoader('partials/home.html', function (template) {
            var outHtml = Mustache.render(template, data);

            $(selector).html(outHtml);
        });
    }

    return {
        load: function () {
            return new HomeViews();
        }
    }
})();