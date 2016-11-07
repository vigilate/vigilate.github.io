"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var http_service_error_class_1 = require('./http-service-error.class');
var backend_class_1 = require('./backend.class');
var AuthService = (function () {
    function AuthService(http, httpServiceError, backend) {
        this.http = http;
        this.httpServiceError = httpServiceError;
        this.backend = backend;
        this.checkLoggedObservable = null;
        this.isLoggedIn = false;
        this.isChecking = false;
        this.token = localStorage.getItem("token");
        this.triedToConnect = false;
        this.url = "/sessions/";
    }
    AuthService.prototype.checkToken = function () {
        var _this = this;
        this.triedToConnect = true;
        if (!this.isChecking || this.checkLoggedObservable != null) {
            this.isChecking = true;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'token ' + this.token);
            this.checkLoggedObservable = this.http.get(this.backend.getUrl() + this.url, new http_1.RequestOptions({ headers: headers }))
                .do(function (data) {
                _this.isLoggedIn = data.ok;
                _this.isChecking = false;
            })
                .catch(function (err) {
                _this.isLoggedIn = false;
                _this.isChecking = false;
                return _this.httpServiceError.handleError(err);
            });
        }
        return this.checkLoggedObservable;
    };
    AuthService.prototype.login = function (user, pwd) {
        var _this = this;
        var headers = new http_1.Headers();
        var body = JSON.stringify({ email: user, password: pwd });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this.http.post(this.backend.getUrl() + this.url, body, new http_1.RequestOptions({ headers: headers }))
            .do(function (data) {
            _this.isLoggedIn = data.ok;
        }).map(function (data) { return data.json(); }).catch(this.httpServiceError.handleError).do(function (data) {
            if (_this.isLoggedIn) {
                _this.token = data.token;
                localStorage.setItem("token", _this.token);
            }
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        localStorage.setItem("token", "");
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'token ' + this.token);
        return this.http.delete(this.backend.getUrl() + this.url + "/" + this.token + "/", new http_1.RequestOptions({ headers: headers }))
            .do(function () {
            _this.isLoggedIn = false;
            _this.token = "";
        })
            .catch(this.httpServiceError.handleError);
    };
    AuthService.prototype.signin = function (email, pwd) {
        var headers = new http_1.Headers();
        var body = JSON.stringify({ email: email, password: pwd });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this.http.post(this.backend.getUrl() + "/users/", body, new http_1.RequestOptions({ headers: headers }))
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_service_error_class_1.HttpServiceError, backend_class_1.Backend])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map