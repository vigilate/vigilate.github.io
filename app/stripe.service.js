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
var user_service_1 = require('./user.service');
var stations_service_1 = require('./stations.service');
var StripeService = (function () {
    function StripeService(api, httpServiceError, userService, stationsService) {
        this.api = api;
        this.httpServiceError = httpServiceError;
        this.userService = userService;
        this.stationsService = stationsService;
        this.amount = 0;
        this.description = "";
        this.id_plan = 0;
        this.handler = null;
        this.configure();
    }
    StripeService.prototype.configure = function () {
        var _this = this;
        if (!("StripeCheckout" in window)) {
            console.log("StipeCheckout is not present");
            return;
        }
        this.handler = window["StripeCheckout"].configure({
            key: 'pk_test_P21OD1NRP68DvjfKeLLvnmxS',
            image: '/foundation/img/vigilate_logo.png',
            locale: 'auto',
            token: function (token) { return _this.sendInfoBackend(token); }
        });
    };
    StripeService.prototype.setProduct = function (id_plan, amount, description) {
        this.id_plan = id_plan;
        this.amount = Math.round(amount);
        this.description = description;
        console.log(this.amount);
    };
    StripeService.prototype.checkout = function () {
        if (this.id_plan == 0) {
            this.sendInfoBackend("");
            this.userService.getUser().subscribe();
            return;
        }
        if (this.handler == null) {
            console.log("stripe is not loaded");
            return;
        }
        this.handler.open({
            name: 'Vigilate',
            description: this.description,
            currency: 'EUR',
            amount: this.amount
        });
    };
    StripeService.prototype.sendInfoBackend = function (token) {
        var _this = this;
        var body = JSON.stringify({ token: token.id });
        this.api.post("/checkout/" + this.id_plan + "/", body, false).subscribe(function (data) {
            console.log(data);
            _this.userService.getUser().subscribe();
            _this.stationsService.discardCache();
        }, function (error) {
            console.log(error);
        });
    };
    StripeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.Api, http_service_error_class_1.HttpServiceError, user_service_1.UserService, stations_service_1.StationsService])
    ], StripeService);
    return StripeService;
}());
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map