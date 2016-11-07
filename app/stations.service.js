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
var user_service_1 = require('./user.service');
var http_service_error_class_1 = require('./http-service-error.class');
var api_service_1 = require('./api.service');
var programs_service_1 = require('./programs.service');
var background_service_1 = require('./background.service');
var StationsService = (function () {
    function StationsService(userService, httpServiceError, api, programsService, backgroundService) {
        this.userService = userService;
        this.httpServiceError = httpServiceError;
        this.api = api;
        this.programsService = programsService;
        this.backgroundService = backgroundService;
        this.stationsListObservable = null;
        this.url = "/stations/";
    }
    StationsService.prototype.getStationsList = function () {
        if (this.stationsListObservable === null) {
            this.stationsListObservable = this.api.get(this.url)
                .cache()
                .map(function (data) { return data.json(); })
                .catch(this.httpServiceError.handleError);
        }
        return this.stationsListObservable;
    };
    StationsService.prototype.getStationsDetail = function (id) {
        return this.api.get(this.url + id + "/")
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    StationsService.prototype.updateStationDetail = function (id, obj) {
        var body = JSON.stringify(obj);
        this.discardCache();
        return this.api.patch(this.url + id + "/", body)
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    StationsService.prototype.createStation = function (name) {
        var _this = this;
        var body = JSON.stringify({ name: name, user: this.userService.user.id });
        return this.api.post(this.url, body)
            .map(function (data) { return data.json(); })
            .do(function () {
            _this.programsService.discardCache();
        })
            .catch(this.httpServiceError.handleError);
    };
    StationsService.prototype.deleteStation = function (id) {
        var _this = this;
        return this.api.delete(this.url + id + "/")
            .do(function () {
            _this.programsService.discardCache();
        })
            .catch(this.httpServiceError.handleError);
    };
    StationsService.prototype.discardCache = function () {
        this.stationsListObservable = null;
        this.backgroundService.update();
    };
    StationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, http_service_error_class_1.HttpServiceError, api_service_1.Api, programs_service_1.ProgramsService, background_service_1.BackgroundService])
    ], StationsService);
    return StationsService;
}());
exports.StationsService = StationsService;
//# sourceMappingURL=stations.service.js.map