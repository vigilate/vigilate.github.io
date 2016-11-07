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
var Observable_1 = require('rxjs/Observable');
var auth_service_1 = require('./auth.service');
var user_service_1 = require('./user.service');
var storage_service_1 = require('./storage.service');
var background_service_1 = require('./background.service');
require('./rxjs-operators');
var AuthGuard = (function () {
    function AuthGuard(authService, userService, router, backgroundService, storageService) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.backgroundService = backgroundService;
        this.storageService = storageService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var redirect_to = "dashboard";
        if (route.urlSegments && route.urlSegments[0])
            redirect_to = route.urlSegments[0].path;
        this.storageService.store("AuthGuard", "current_page", redirect_to);
        if (this.authService.isLoggedIn && this.userService.user)
            return true;
        if (this.authService.token != "") {
            return this.authService.checkToken().flatMap(function (data) {
                if (data.ok) {
                    return _this.userService.getUser().map(function () {
                        _this.backgroundService.init();
                        return true;
                    });
                }
                else {
                    _this.goToLogin(redirect_to);
                    return Observable_1.Observable.of(false);
                }
            })
                .catch(function () {
                _this.goToLogin(redirect_to);
                return Observable_1.Observable.of(false);
            });
        }
        this.goToLogin(redirect_to);
        return false;
    };
    AuthGuard.prototype.goToLogin = function (redirect_to) {
        this.storageService.store("AuthGuard", "redirect", redirect_to);
        this.router.navigate(['/login']);
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, user_service_1.UserService, router_1.Router, background_service_1.BackgroundService, storage_service_1.StorageService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map