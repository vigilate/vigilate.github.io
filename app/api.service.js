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
var auth_service_1 = require('./auth.service');
var backend_class_1 = require('./backend.class');
var Api = (function () {
    function Api(http, authService, backend) {
        this.http = http;
        this.authService = authService;
        this.backend = backend;
    }
    Api.prototype.generateOptions = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        if (this.authService.isLoggedIn)
            headers.append('Authorization', 'token ' + this.authService.getToken());
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    Api.prototype.get = function (url, with_api_path) {
        if (with_api_path === void 0) { with_api_path = true; }
        var dest;
        if (with_api_path)
            dest = this.backend.getUrl() + url;
        else
            dest = this.backend.getHost() + url;
        return this.http.get(dest, this.generateOptions());
    };
    Api.prototype.delete = function (url) {
        return this.http.delete(this.backend.getUrl() + url, this.generateOptions());
    };
    Api.prototype.post = function (url, body, with_api_path) {
        if (with_api_path === void 0) { with_api_path = true; }
        var dest;
        if (with_api_path)
            dest = this.backend.getUrl() + url;
        else
            dest = this.backend.getHost() + url;
        return this.http.post(dest, body, this.generateOptions());
    };
    Api.prototype.patch = function (url, body) {
        return this.http.patch(this.backend.getUrl() + url, body, this.generateOptions());
    };
    Api = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, backend_class_1.Backend])
    ], Api);
    return Api;
}());
exports.Api = Api;
//# sourceMappingURL=api.service.js.map