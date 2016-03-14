var app = app || {};

app.userModule = (function () {
    function UserModule() {
        this.serviceUrl = app.requester.baseUrl + 'user/' + app.requester.appId;
    }

    UserModule.prototype.signUp = function (username, password, email) {
        var requestUrl = this.serviceUrl,
            defer = Q.defer(),
            data = {
                username: username,
                password: password,
                email: email
            };

        app.requester.post(requestUrl, data)
            .then(function (success) {
                sessionStorage.setItem('sessionAuth', success._kmd.authtoken);
                sessionStorage.setItem('userId', success._id);
                sessionStorage.setItem('username', username);
                defer.resolve();
            }, function (error) {
                console.error(error);
                defer.reject();
            }).done();

        return defer.promise;
    }

    UserModule.prototype.login = function (username, password) {
        var requestUrl = this.serviceUrl + '/login',
            defer = Q.defer(),
            data = {
                username: username,
                password: password
            };

        app.requester.post( requestUrl, data)
            .then(function (success) {
                sessionStorage.setItem('sessionAuth', success._kmd.authtoken);
                sessionStorage.setItem('userId', success._id);
                sessionStorage.setItem('username', username);
                defer.resolve();
            }, function (error) {
                console.error(error);
                defer.reject();
            }).done();

        return defer.promise;
    }

    UserModule.prototype.logout = function () {
        var defer = Q.defer();

        sessionStorage.removeItem('sessionAuth');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');

        defer.resolve();
        return defer.promise;
    }

    UserModule.prototype.getInfo = function () {
        var requestUrl = this.serviceUrl + '/_me';

        app.requester.makeRequest('GET', requestUrl, null, true)
        .then(function (success) {
            console.log(success);
        }, function (error) {
            console.error(error);
        }).done();
    }

    //return UserModule;
    return {
        load: function () {
            return new UserModule();
        }
    };
}());