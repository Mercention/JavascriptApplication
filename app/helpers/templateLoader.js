var app = app || {};

app.templateLoader = (function () {
    function LoadTemplate(url, data) {
        var defer = Q.defer();

        $.ajax({
            method: 'GET',
            url: url,
            dataType: 'html',
            success: function (template) {
                data(template);
                defer.resolve();
            },
            error: function (error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    return LoadTemplate;
}());