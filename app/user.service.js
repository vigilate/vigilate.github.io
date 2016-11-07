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
var http_service_error_class_1 = require('./http-service-error.class');
var api_service_1 = require('./api.service');
var UserService = (function () {
    function UserService(httpServiceError, api) {
        this.httpServiceError = httpServiceError;
        this.api = api;
        this.user = null;
        this.url = "/users/";
    }
    UserService.prototype.getUser = function () {
        var _this = this;
        return this.api.get(this.url)
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError).do(function (data) {
            _this.user = data[0];
        });
    };
    UserService.prototype.deleteAccount = function () {
        return this.api.delete(this.url + this.user.id + "/")
            .map(function (data) {
            if (!data.ok)
                return data.json();
            return data;
        })
            .catch(this.httpServiceError.handleError);
    };
    UserService.prototype.updatePhoneNumber = function (phone) {
        var body = JSON.stringify({ "phone": phone });
        return this.api.patch(this.url + this.user.id + "/", body)
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    UserService.prototype.updateInfos = function (infos) {
        var _this = this;
        var body = JSON.stringify(infos);
        return this.api.patch(this.url + this.user.id + "/", body)
            .do(function (data) {
            if (data.ok)
                _this.user = data.json();
        })
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    UserService.prototype.getStats = function () {
        return this.api.get(this.url + this.user.id + "/stats/")
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_error_class_1.HttpServiceError, api_service_1.Api])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map