"use strict";
var _this = this;
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var core_1 = require('@angular/core');
require('app/rxjs-operators');
var auth_service_1 = require('./auth.service');
var http_service_error_class_1 = require('./http-service-error.class');
testing_1.describe('AuthService', function () {
    testing_1.beforeEachProviders(function () { return [
        auth_service_1.AuthService,
        http_service_error_class_1.HttpServiceError,
        http_1.BaseRequestOptions,
        testing_2.MockBackend,
        core_1.provide(http_1.Http, {
            useFactory: function (backend, defaultOptions) {
                return new http_1.Http(backend, defaultOptions);
            },
            deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
        })
    ]; });
    testing_1.beforeEach(function () {
        _this.email = "UserA@a.com";
        _this.pwd = "PwdA";
        _this.baseResponseGood = new http_1.Response(new http_1.ResponseOptions({
            status: 200,
            body: JSON.stringify([
                {
                    "id": 1,
                    "email": _this.email,
                    "password": "hash",
                    "user_type": 0,
                    "contrat": 0,
                    "id_dealer": 0
                }
            ])
        }));
        _this.baseResponseBadEmail = new http_1.Response(new http_1.ResponseOptions({
            status: 401,
            body: JSON.stringify({
                "detail": "No such user"
            }),
        }));
        _this.baseResponseBadPassword = new http_1.Response(new http_1.ResponseOptions({
            status: 401,
            body: JSON.stringify({
                "detail": "Wrong password"
            }),
        }));
    });
    testing_1.it('must not be connected before logging in', testing_1.inject([auth_service_1.AuthService], function (authService, backend) {
        testing_1.expect(authService.isLoggedIn).toBe(false);
    }));
    testing_1.it('must return user object', testing_1.inject([auth_service_1.AuthService, testing_2.MockBackend], function (authService, backend) {
        backend.connections.subscribe(function (c) { return c.mockRespond(_this.baseResponseGood); });
        authService.login(_this.email, _this.pwd).subscribe(function (res) {
            testing_1.expect(res[0]["email"]).toBe(_this.email);
        });
    }));
    testing_1.it('must be connected after successfull logging in', testing_1.inject([auth_service_1.AuthService, testing_2.MockBackend], function (authService, backend) {
        backend.connections.subscribe(function (c) { return c.mockRespond(_this.baseResponseGood); });
        authService.login(_this.email, _this.pwd).subscribe(function (res) {
            testing_1.expect(authService.isLoggedIn).toBe(true);
        });
    }));
    testing_1.it('must not be connected after bad email', testing_1.inject([auth_service_1.AuthService, testing_2.MockBackend], function (authService, backend) {
        backend.connections.subscribe(function (c) { return c.mockRespond(_this.baseResponseBadEmail); });
        authService.login(_this.email, _this.pwd).subscribe(function (res) {
            testing_1.expect(authService.isLoggedIn).toBe(false);
        });
    }));
    testing_1.it('must not be connected after bad password', testing_1.inject([auth_service_1.AuthService, testing_2.MockBackend], function (authService, backend) {
        backend.connections.subscribe(function (c) { return c.mockRespond(_this.baseResponseBadPassword); });
        authService.login(_this.email, _this.pwd).subscribe(function (res) {
            testing_1.expect(authService.isLoggedIn).toBe(false);
        });
    }));
});
//# sourceMappingURL=auth.service.spec.js.map