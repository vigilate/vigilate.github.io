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
var background_service_1 = require('./background.service');
var AlertsService = (function () {
    function AlertsService(httpServiceError, api, backgroundService) {
        this.httpServiceError = httpServiceError;
        this.api = api;
        this.backgroundService = backgroundService;
        this.cacheTimeout = new core_1.EventEmitter();
        this.alertsListObservable = null;
        this.cacheTimestamp = 0;
        this.cacheDuration = 1 * 60;
        this.timerId = -1;
        this.url = "/alerts/";
    }
    AlertsService.prototype.getAlertsList = function () {
        var _this = this;
        this.checkCacheTimestamp();
        if (this.alertsListObservable === null) {
            this.alertsListObservable = this.api.get(this.url)
                .cache()
                .map(function (data) { return data.json(); })
                .catch(this.httpServiceError.handleError).do(function () { return _this.updateCacheTimestamp(); });
        }
        return this.alertsListObservable;
    };
    AlertsService.prototype.markRead = function (id) {
        return this.api.get(this.url + id + "/mark_read/")
            .cache()
            .catch(this.httpServiceError.handleError);
    };
    AlertsService.prototype.markUnread = function (id) {
        return this.api.get(this.url + id + "/mark_unread/")
            .cache()
            .catch(this.httpServiceError.handleError);
    };
    AlertsService.prototype.markAllRead = function () {
        return this.api.get(this.url + "mark_all_read/")
            .cache()
            .catch(this.httpServiceError.handleError);
    };
    AlertsService.prototype.markAllUnread = function () {
        return this.api.get(this.url + "mark_all_unread/")
            .cache()
            .catch(this.httpServiceError.handleError);
    };
    AlertsService.prototype.getAlertsDetail = function (id) {
        return this.api.get(this.url + id + "/")
            .map(function (data) { return data.json(); })
            .catch(this.httpServiceError.handleError);
    };
    AlertsService.prototype.discardCache = function () {
        this.cacheTimestamp = 0;
        this.backgroundService.update();
    };
    AlertsService.prototype.updateCacheTimestamp = function () {
        var _this = this;
        this.cacheTimestamp = new Date().getTime() / 1000;
        if (this.timerId != -1)
            clearTimeout(this.timerId);
        this.timerId = setTimeout(function () {
            _this.checkCacheTimestamp();
        }, this.cacheDuration * 1000);
    };
    AlertsService.prototype.checkCacheTimestamp = function () {
        var now = new Date().getTime() / 1000;
        if (now - this.cacheTimestamp >= this.cacheDuration
            && this.alertsListObservable !== null) {
            this.alertsListObservable = null;
            this.cacheTimeout.emit(null);
        }
    };
    AlertsService.prototype.trigerEmitTimeout = function () {
        this.discardCache();
        this.checkCacheTimestamp();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AlertsService.prototype, "cacheTimeout", void 0);
    AlertsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_error_class_1.HttpServiceError, api_service_1.Api, background_service_1.BackgroundService])
    ], AlertsService);
    return AlertsService;
}());
exports.AlertsService = AlertsService;
//# sourceMappingURL=alerts.service.js.map