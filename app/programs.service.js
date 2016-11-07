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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var alerts_service_1 = require('./alerts.service');
var http_service_error_class_1 = require('./http-service-error.class');
var api_service_1 = require('./api.service');
var background_service_1 = require('./background.service');
var ProgramsService = (function () {
    function ProgramsService(httpServiceError, api, alertsService, backgroundService) {
        this.httpServiceError = httpServiceError;
        this.api = api;
        this.alertsService = alertsService;
        this.backgroundService = backgroundService;
        this.cacheTimeout = new core_1.EventEmitter();
        this.programListObservable = null;
        this.cacheTimestamp = 0;
        this.cacheDuration = 1 * 60;
        this.timerId = -1;
        this.url = "/uprog/";
    }
    ProgramsService.prototype.getProgramsList = function () {
        var _this = this;
        this.checkCacheTimestamp();
        if (this.programListObservable === null) {
            this.programListObservable = this.api.get(this.url)
                .cache()
                .map(function (data) { return data.json(); })
                .catch(this.httpServiceError.handleError).do(function () { return _this.updateCacheTimestamp(); });
        }
        return this.programListObservable;
    };
    ProgramsService.prototype.getProgramsDetail = function (id) {
        return this.api.get(this.url + id + "/")
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    ProgramsService.prototype.updateProgramsDetail = function (id, obj) {
        var body = JSON.stringify(obj);
        this.discardCache();
        return this.api.patch(this.url + id + "/", body)
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    ProgramsService.prototype.createProgram = function (obj) {
        var body = JSON.stringify(obj);
        this.discardCache();
        return this.api.post(this.url, body)
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    ProgramsService.prototype.deleteProgram = function (id) {
        this.discardCache();
        return this.api.delete(this.url + id + "/")
            .map(function (data) {
            if (!data.ok)
                return data.json();
            return data;
        })
            .catch(this.httpServiceError.handleError);
    };
    ProgramsService.prototype.discardCache = function () {
        this.cacheTimestamp = 0;
        this.alertsService.discardCache();
        this.backgroundService.update();
    };
    ProgramsService.prototype.updateCacheTimestamp = function () {
        var _this = this;
        this.cacheTimestamp = new Date().getTime() / 1000;
        if (this.timerId != -1)
            clearTimeout(this.timerId);
        this.timerId = setTimeout(function () {
            _this.checkCacheTimestamp();
        }, this.cacheDuration * 1000);
    };
    ProgramsService.prototype.checkCacheTimestamp = function () {
        var now = new Date().getTime() / 1000;
        if (now - this.cacheTimestamp >= this.cacheDuration
            && this.programListObservable !== null) {
            this.programListObservable = null;
            this.cacheTimeout.emit(null);
        }
    };
    ProgramsService.prototype.trigerEmitTimeout = function () {
        this.discardCache();
        this.checkCacheTimestamp();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProgramsService.prototype, "cacheTimeout", void 0);
    ProgramsService = __decorate([
        core_1.Injectable(),
        __param(3, core_1.Inject(core_1.forwardRef(function () { return background_service_1.BackgroundService; }))), 
        __metadata('design:paramtypes', [http_service_error_class_1.HttpServiceError, api_service_1.Api, alerts_service_1.AlertsService, background_service_1.BackgroundService])
    ], ProgramsService);
    return ProgramsService;
}());
exports.ProgramsService = ProgramsService;
//# sourceMappingURL=programs.service.js.map