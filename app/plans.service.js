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
var PlansService = (function () {
    function PlansService(httpServiceError, api) {
        this.httpServiceError = httpServiceError;
        this.api = api;
        this.plansListObservable = null;
        this.url = "/plans/";
    }
    PlansService.prototype.getPlansList = function () {
        if (this.plansListObservable === null) {
            this.plansListObservable = this.api.get(this.url)
                .cache()
                .map(function (data) { return data.json(); })
                .catch(this.httpServiceError.handleError);
        }
        return this.plansListObservable;
    };
    PlansService.prototype.discardCache = function () {
        this.plansListObservable = null;
    };
    PlansService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_error_class_1.HttpServiceError, api_service_1.Api])
    ], PlansService);
    return PlansService;
}());
exports.PlansService = PlansService;
//# sourceMappingURL=plans.service.js.map