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
var alerts_service_1 = require('./alerts.service');
var cvss_pipe_1 = require('./cvss.pipe');
var AlertsDetailComponent = (function () {
    function AlertsDetailComponent(authService, alertsService, router, route) {
        this.authService = authService;
        this.alertsService = alertsService;
        this.router = router;
        this.route = route;
    }
    AlertsDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.alertsService.getAlertsDetail(id).subscribe(function (program) {
                _this.alerts_obj = JSON.parse(JSON.stringify(program));
                if (!_this.alerts_obj.view) {
                    _this.alertsService.markRead(id)
                        .subscribe(function (ret) {
                        _this.alertsService.discardCache();
                    }, function (error) {
                        if (error == "NeedToReconnect")
                            throw error;
                        console.log(error);
                    });
                }
            }, function (error) {
                if (error == "NeedToReconnect")
                    throw error;
                _this.alertsService.discardCache();
                _this.onGoBackList();
            });
        });
    };
    AlertsDetailComponent.prototype.onGoBackList = function () {
        this.router.navigate(['/alerts']);
    };
    AlertsDetailComponent.prototype.onGoProgram = function () {
        this.router.navigate(['/programs', this.alerts_obj.program.id]);
    };
    AlertsDetailComponent = __decorate([
        core_1.Component({
            selector: 'alerts-detail',
            templateUrl: 'app/alerts-detail.component.html',
            directives: [],
            pipes: [cvss_pipe_1.CvssPipe]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, alerts_service_1.AlertsService, router_1.Router, router_1.ActivatedRoute])
    ], AlertsDetailComponent);
    return AlertsDetailComponent;
}());
exports.AlertsDetailComponent = AlertsDetailComponent;
//# sourceMappingURL=alerts-detail.component.js.map