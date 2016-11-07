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
var background_service_1 = require('./background.service');
var user_service_1 = require('./user.service');
var storage_service_1 = require('./storage.service');
var validation_class_1 = require('./validation.class');
var common_1 = require('@angular/common');
var notifications_service_1 = require('./notifications.service');
var LoginComponent = (function () {
    function LoginComponent(authService, userService, router, route, backgroundService, storageService, builder, notificationsService) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.backgroundService = backgroundService;
        this.storageService = storageService;
        this.builder = builder;
        this.notificationsService = notificationsService;
        this.user = null;
        this.email = "";
        this.password = "";
        this.loadingLogin = false;
        this.loadingSignin = false;
        this.clicked = false;
        this.ctrl = {
            form: null,
            email: null,
            password: null
        };
        this.error_field = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authService.isLoggedIn || (!this.authService.triedToConnect && this.authService.token != ""))
            this.router.navigate(['/dashboard']);
        this.ctrl.email = new common_1.Control("", common_1.Validators.compose([common_1.Validators.required, validation_class_1.EmailValidator.isValid]));
        this.ctrl.password = new common_1.Control('', common_1.Validators.required);
        this.ctrl.form = this.builder.group({
            email: this.ctrl.email,
            password: this.ctrl.password
        });
    };
    LoginComponent.prototype.onSubmitLogin = function () {
        this.clicked = true;
        if (!this.ctrl.form.valid)
            return;
        this.loadingLogin = true;
        this.login();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.error_field = {};
        this.authService.login(this.email, this.password)
            .subscribe(function (data) {
            _this.getUser();
        }, function (error) {
            console.error(error);
            _this.loadingLogin = false;
            if (error.json) {
                for (var f in error.json) {
                    _this.error_field[f] = error.json[f].join(" ");
                }
            }
        });
    };
    LoginComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser()
            .subscribe(function (data) {
            _this.loadingLogin = false;
            _this.backgroundService.init();
            var redir = _this.storageService.get("AuthGuard", "redirect", "dashboard");
            _this.storageService.delete("AuthGuard", "redirect");
            _this.router.navigate(['/' + redir]);
        }, function (error) {
            console.error(error);
            _this.loadingLogin = false;
            if (error.json) {
                for (var f in error.json) {
                    _this.error_field[f] = error.json[f].join(" ");
                }
            }
        });
    };
    LoginComponent.prototype.onSubmitSignin = function () {
        var _this = this;
        this.clicked = true;
        if (!this.ctrl.form.valid)
            return;
        this.error_field = {};
        this.loadingSignin = true;
        this.authService.signin(this.email, this.password)
            .subscribe(function (user) {
            _this.loadingSignin = false;
            _this.notificationsService.success("User " + user.email + " created");
        }, function (error) {
            console.error(error);
            _this.loadingSignin = false;
            if (error.json) {
                for (var f in error.json) {
                    _this.error_field[f] = error.json[f].join(" ");
                }
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/login.component.html',
            styleUrls: ['app/login.component.css'],
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, user_service_1.UserService, router_1.Router, router_1.ActivatedRoute, background_service_1.BackgroundService, storage_service_1.StorageService, common_1.FormBuilder, notifications_service_1.NotificationsService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map