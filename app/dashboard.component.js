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
var router_1 = require('@angular/router');
var auth_service_1 = require('./auth.service');
var user_service_1 = require('./user.service');
var background_service_1 = require('./background.service');
var storage_service_1 = require('./storage.service');
var DashboardComponent = (function () {
    function DashboardComponent(authService, userService, router, backgroundService, storageService) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.backgroundService = backgroundService;
        this.storageService = storageService;
        this.nb_total_prog = 0;
        this.nb_total_alert = 0;
        this.nb_total_station = 0;
        this.stats_loaded = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nb_total_prog = this.storageService.get("DashboardComponent", "total_prog", 0);
        this.nb_total_station = this.storageService.get("DashboardComponent", "total_station", 0);
        this.nb_total_alert = this.storageService.get("DashboardComponent", "total_alert", 0);
        this.backgroundService.cntTotalAlert
            .subscribe(function (nb_total_alert) {
            _this.nb_total_alert = nb_total_alert;
            _this.storageService.store("DashboardComponent", "total_alert", nb_total_alert);
            _this.stats_loaded = true;
        });
        this.backgroundService.cntTotalProg
            .subscribe(function (nb_total_prog) {
            _this.nb_total_prog = nb_total_prog;
            _this.storageService.store("DashboardComponent", "total_prog", nb_total_prog);
            _this.stats_loaded = true;
        });
        this.backgroundService.cntTotalStation
            .subscribe(function (nb_total_station) {
            _this.nb_total_station = nb_total_station;
            _this.storageService.store("DashboardComponent", "total_station", nb_total_station);
            _this.stats_loaded = true;
        });
        this.backgroundService.update();
    };
    DashboardComponent.prototype.onClick = function (target) {
        this.router.navigate(['/' + target]);
    };
    DashboardComponent.prototype.onClickTour = function () {
        this.storageService.store("Tour", "current_step", "/stations");
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dasboard',
            templateUrl: 'app/dashboard.component.html',
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, user_service_1.UserService, router_1.Router, background_service_1.BackgroundService, storage_service_1.StorageService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map