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
var auth_service_1 = require('./auth.service');
var programs_service_1 = require('./programs.service');
var background_service_1 = require('./background.service');
var router_1 = require('@angular/router');
var backend_class_1 = require('./backend.class');
var user_service_1 = require('./user.service');
require('./rxjs-operators');
var storage_service_1 = require('./storage.service');
var notifications_component_1 = require('./notifications.component');
var AppComponent = (function () {
    function AppComponent(authService, programsService, backgroundService, backend, userService, router, storageService) {
        this.authService = authService;
        this.programsService = programsService;
        this.backgroundService = backgroundService;
        this.backend = backend;
        this.userService = userService;
        this.router = router;
        this.storageService = storageService;
        this.nb_new_alert = 0;
        this.routes = [
            { name: "Dashboard", path: "/dashboard", active: true },
            { name: "Programs", path: "/programs", active: false },
            { name: "Alerts", path: "/alerts", active: false },
            { name: "Settings", path: "/settings", active: false },
            { name: "Stations", path: "/stations", active: false }
        ];
        this.activated_page = "";
        this.tour_current_step = "";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.backgroundService.cntAlertChange
            .subscribe(function (nb_new_alert) {
            _this.nb_new_alert = nb_new_alert;
        });
        this.storageService.updated
            .subscribe(function (obj) {
            if (obj.client == "AuthGuard" && obj.key == "current_page")
                _this.activated_page = "/" + obj.value;
            if (obj.client == "Tour" && obj.key == "current_step") {
                _this.tour_current_step = obj.value;
                console.log("Tour changed", obj.value);
            }
        });
    };
    AppComponent.prototype.onImgClick = function () {
        var new_url = prompt("Backend URL:", this.backend.getHost());
        if (new_url != null && new_url != this.backend.getHost()) {
            this.backend.setHost(new_url);
        }
    };
    AppComponent.prototype.logout = function () {
        this.router.navigate(['/logout']);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, notifications_component_1.NotificationsComponent]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, programs_service_1.ProgramsService, background_service_1.BackgroundService, backend_class_1.Backend, user_service_1.UserService, router_1.Router, storage_service_1.StorageService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map