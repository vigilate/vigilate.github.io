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
var stations_service_1 = require('./stations.service');
var common_1 = require('@angular/common');
var notifications_service_1 = require('./notifications.service');
var StationsDetailComponent = (function () {
    function StationsDetailComponent(router, route, stationsService, builder, notificationsService) {
        this.router = router;
        this.route = route;
        this.stationsService = stationsService;
        this.builder = builder;
        this.notificationsService = notificationsService;
        this.loadingSubmit = false;
        this.have_changes = false;
        this.alerts = [];
        this.station_obj = null;
        this.station_obj_origin = null;
        this.station_params = [
            { name: "Name", key: "name" }
        ];
        this.clicked = false;
        this.ctrl = {
            form: null,
            name: null,
        };
        this.error_field = {};
    }
    StationsDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ctrl.name = new common_1.Control("", common_1.Validators.required);
        this.ctrl.form = this.builder.group({
            name: this.ctrl.name,
        });
        var sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.stationsService.getStationsDetail(id).subscribe(function (station) {
                _this.station_obj_origin = JSON.parse(JSON.stringify(station));
                _this.station_obj = station;
            }, function (error) {
                if (error == "NeedToReconnect")
                    throw error;
                _this.stationsService.discardCache();
                _this.onGoBackList();
            });
        });
    };
    StationsDetailComponent.prototype.onChange = function (key, ev) {
        this.station_obj[key] = ev.target.value;
        this.updateHaveChange();
    };
    StationsDetailComponent.prototype.updateHaveChange = function () {
        var tmp_changes = false;
        for (var i = 0; i < this.station_params.length; i++) {
            var k = this.station_params[i]["key"];
            tmp_changes = tmp_changes || (this.station_obj_origin[k] != this.station_obj[k]);
        }
        this.have_changes = tmp_changes;
    };
    StationsDetailComponent.prototype.onSubmit = function () {
        var _this = this;
        this.error_field = {};
        this.clicked = true;
        if (!this.ctrl.form.valid)
            return;
        this.loadingSubmit = true;
        this.stationsService.updateStationDetail(this.station_obj.id, this.station_obj).subscribe(function (station) {
            _this.loadingSubmit = false;
            _this.station_obj_origin = JSON.parse(JSON.stringify(station));
            _this.updateHaveChange();
            _this.notificationsService.info("Changes submited");
        }, function (error) {
            _this.loadingSubmit = false;
            if (error == "NeedToReconnect")
                throw error;
            if (error.json) {
                for (var f in error.json) {
                    _this.error_field[f] = error.json[f].join(" ");
                }
            }
            if (error.code == 404) {
                _this.notificationsService.alert("This station has been deleted and can't be updated anymore.");
                _this.stationsService.discardCache();
                _this.onGoBackList();
            }
        });
    };
    StationsDetailComponent.prototype.onGoBackList = function () {
        this.router.navigate(['/stations']);
    };
    StationsDetailComponent = __decorate([
        core_1.Component({
            selector: 'stations-detail',
            templateUrl: 'app/stations-detail.component.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, stations_service_1.StationsService, common_1.FormBuilder, notifications_service_1.NotificationsService])
    ], StationsDetailComponent);
    return StationsDetailComponent;
}());
exports.StationsDetailComponent = StationsDetailComponent;
//# sourceMappingURL=stations-detail.component.js.map