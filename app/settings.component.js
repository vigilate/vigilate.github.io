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
var stations_service_1 = require('./stations.service');
var validation_class_1 = require('./validation.class');
var common_1 = require('@angular/common');
var notifications_service_1 = require('./notifications.service');
var stripe_service_1 = require('./stripe.service');
var plans_service_1 = require('./plans.service');
var SettingsComponent = (function () {
    function SettingsComponent(authService, userService, stationsService, router, builder, notificationsService, stripeService, plansService) {
        this.authService = authService;
        this.userService = userService;
        this.stationsService = stationsService;
        this.router = router;
        this.builder = builder;
        this.notificationsService = notificationsService;
        this.stripeService = stripeService;
        this.plansService = plansService;
        this.ctrl = {
            form: null,
            phone: null,
            password: null,
            password_confirm: null
        };
        this.loadingSubmit = false;
        this.phone_number = "";
        this.password = "";
        this.password_confirm = "";
        this.default_alert = "";
        this.default_alert_types = ["EMAIL", "SMS"];
        this.error_field = {};
        this.loadingPlan = {
            0: false,
            1: false,
            2: false
        };
        this.plans = [];
        this.plans_dic = {};
        this.selected_plan = null;
        this.remaining_time = 0;
        this.timerId = -1;
        this.last_reload_user = 0;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.phone_number = this.userService.user.phone;
        this.default_alert = this.userService.user.default_alert_type;
        this.ctrl.phone = new common_1.Control("", validation_class_1.PhoneValidator.isPrefixed);
        this.ctrl.password = new common_1.Control("", validation_class_1.TriggerValidator(this.ctrl, "password_confirm"));
        this.ctrl.password_confirm = new common_1.Control("", validation_class_1.MatchValidator(this.ctrl, "password"));
        this.ctrl.form = this.builder.group({
            phone: this.ctrl.phone,
            password: this.ctrl.password,
            password_confirm: this.ctrl.password_confirm
        });
        this.reloadUser();
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        if (this.timerId != -1)
            clearInterval(this.timerId);
    };
    SettingsComponent.prototype.reloadUser = function () {
        var _this = this;
        if (new Date().getTime() / 1000 - this.last_reload_user < 1)
            return;
        this.last_reload_user = new Date().getTime() / 1000;
        this.userService.getUser().subscribe(function (data) {
            _this.phone_number = _this.userService.user.phone;
            _this.default_alert = _this.userService.user.default_alert_type;
            _this.reloadPlans();
        }, function (error) {
        });
    };
    SettingsComponent.prototype.reloadPlans = function () {
        var _this = this;
        this.plansService.getPlansList().subscribe(function (data) {
            _this.plans = data;
            for (var _i = 0, _a = _this.plans; _i < _a.length; _i++) {
                var pl = _a[_i];
                _this.plans_dic[pl.id] = pl;
            }
            _this.selected_plan = _this.plans_dic[_this.userService.user["plan"]];
            if (_this.timerId == -1)
                _this.updateRemaining();
        }, function (error) {
        });
    };
    SettingsComponent.prototype.updateRemaining = function () {
        var _this = this;
        if (this.plans.length == 0)
            return;
        if (this.timerId == -1) {
            this.timerId = setInterval(function () { return _this.updateRemaining(); }, 3000);
        }
        this.selected_plan = this.plans_dic[this.userService.user["plan"]];
        if (this.selected_plan.validity_time == 0)
            return;
        this.remaining_time = new Date().getTime() / 1000;
        this.remaining_time -= new Date(this.userService.user["plan_purchase_date"]).getTime() / 1000;
        this.remaining_time = this.selected_plan.validity_time - this.remaining_time;
        this.remaining_time = Math.ceil(this.remaining_time);
        if (this.remaining_time <= 0) {
            this.reloadUser();
            this.stationsService.discardCache();
        }
    };
    SettingsComponent.prototype.deleteAccount = function () {
        var _this = this;
        var ret = window.confirm("The user '" + this.userService.user.email + "' and all the data linked to it will be deleted.");
        if (!ret)
            return;
        this.userService.deleteAccount().subscribe(function () {
            _this.notificationsService.success("The user has been deleted.");
            _this.router.navigate(['/logout']);
        }, function (error) {
            if (error == "NeedToReconnect")
                throw error;
        });
    };
    SettingsComponent.prototype.onClickSubmit = function () {
        var _this = this;
        this.loadingSubmit = true;
        var info = {};
        info["phone"] = this.phone_number;
        info["default_alert_type"] = this.default_alert;
        if (this.password != "" && this.password == this.password_confirm) {
            info["password"] = this.password;
        }
        this.error_field = {};
        this.userService.updateInfos(info).subscribe(function () {
            _this.loadingSubmit = false;
            _this.notificationsService.info("Changes submited");
        }, function (err) {
            if (err.json) {
                for (var f in err.json) {
                    _this.error_field[f] = err.json[f].join(" ");
                }
            }
            _this.loadingSubmit = false;
        });
    };
    SettingsComponent.prototype.onClickPlan = function (plan) {
        this.stripeService.setProduct(plan.id, plan.price * 100, plan.name);
        this.stripeService.checkout();
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'settings',
            templateUrl: 'app/settings.component.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, user_service_1.UserService, stations_service_1.StationsService, router_1.Router, common_1.FormBuilder, notifications_service_1.NotificationsService, stripe_service_1.StripeService, plans_service_1.PlansService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map