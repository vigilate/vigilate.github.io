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
var stations_service_1 = require('./stations.service');
var ng2_pagination_1 = require('ng2-pagination/dist/ng2-pagination');
var api_service_1 = require('./api.service');
var storage_service_1 = require('./storage.service');
var common_1 = require('@angular/common');
var StationsComponent = (function () {
    function StationsComponent(authService, stationsService, router, api, storageService, builder) {
        this.authService = authService;
        this.stationsService = stationsService;
        this.router = router;
        this.api = api;
        this.storageService = storageService;
        this.builder = builder;
        this.pageLoading = true;
        this.loadingSubmit = false;
        this.stations = [];
        this.stations_dic = {};
        this.new_station_name = "";
        this.tour_current_step = "";
        this.clicked = false;
        this.ctrl = {
            form: null,
            name: null,
        };
        this.error_field = {};
    }
    StationsComponent.prototype.ngOnInit = function () {
        this.ctrl.name = new common_1.Control("", common_1.Validators.required);
        this.ctrl.form = this.builder.group({
            name: this.ctrl.name,
        });
        this.reloadList();
        var tour = this.storageService.get("Tour", "current_step", "");
        if (tour == "/stations") {
            this.tour_current_step = "add-station";
            this.storageService.store("Tour", "current_step", this.tour_current_step);
        }
    };
    StationsComponent.prototype.reloadList = function () {
        var _this = this;
        this.pageLoading = true;
        this.stationsService.getStationsList()
            .subscribe(function (stations) {
            for (var _i = 0, stations_1 = stations; _i < stations_1.length; _i++) {
                var st = stations_1[_i];
                _this.stations_dic[st.id] = st.name;
            }
            _this.stations = stations;
            _this.pageLoading = false;
        }, function (error) {
            _this.pageLoading = false;
            if (error == "NeedToReconnect")
                throw error;
            console.log(error);
        });
    };
    StationsComponent.prototype.onClick = function (id) {
        this.router.navigate(['/stations', id]);
    };
    StationsComponent.prototype.onDelete = function (id) {
        var _this = this;
        var ret = window.confirm("The station '" + this.stations_dic[id] + "' and all the programs linked to it will be deleted.");
        if (!ret)
            return;
        this.stationsService.deleteStation(id)
            .subscribe(function (stations) {
            _this.stationsService.discardCache();
            _this.reloadList();
        }, function (error) {
            if (error == "NeedToReconnect")
                throw error;
            if (error.code == 404)
                _this.reloadList();
            console.log(error);
        });
    };
    StationsComponent.prototype.onAddStation = function () {
        var _this = this;
        this.error_field = {};
        this.clicked = true;
        if (!this.ctrl.form.valid)
            return;
        this.loadingSubmit = true;
        this.stationsService.createStation(this.new_station_name)
            .subscribe(function (stations) {
            _this.loadingSubmit = false;
            _this.stationsService.discardCache();
            _this.reloadList();
            var tour = _this.storageService.get("Tour", "current_step", "");
            if (tour == "add-station") {
                _this.tour_current_step = "download-scanner";
                _this.storageService.store("Tour", "current_step", _this.tour_current_step);
            }
        }, function (error) {
            _this.loadingSubmit = false;
            if (error == "NeedToReconnect")
                throw error;
            if (error.json) {
                for (var f in error.json) {
                    _this.error_field[f] = error.json[f].join(" ");
                }
            }
        });
    };
    StationsComponent.prototype.onDownload = function (id, name) {
        var _this = this;
        this.api.get("/get_scanner/" + id + "/", false).subscribe(function (data) {
            var type = 'application/text';
            if (data.headers.has("Content-Type"))
                type = data.headers.get("Content-Type");
            var blob = new Blob([data.text()], { type: type });
            window["saveAs"](blob, "scanner-" + _this.sanitizedName(name) + "_" + id + ".py");
            var tour = _this.storageService.get("Tour", "current_step", "");
            if (tour == "download-scanner") {
                _this.tour_current_step = "/programs";
                _this.storageService.store("Tour", "current_step", _this.tour_current_step);
            }
        }, function (error) {
            if (error == "NeedToReconnect")
                throw error;
            if (error.code == 404)
                _this.reloadList();
        });
    };
    StationsComponent.prototype.sanitizedName = function (name) {
        return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    };
    StationsComponent.prototype.onClickRefresh = function () {
        this.stationsService.discardCache();
        this.reloadList();
    };
    StationsComponent = __decorate([
        core_1.Component({
            selector: 'stations',
            templateUrl: 'app/stations.component.html',
            pipes: [ng2_pagination_1.PaginatePipe],
            providers: [ng2_pagination_1.PaginationService]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, stations_service_1.StationsService, router_1.Router, api_service_1.Api, storage_service_1.StorageService, common_1.FormBuilder])
    ], StationsComponent);
    return StationsComponent;
}());
exports.StationsComponent = StationsComponent;
//# sourceMappingURL=stations.component.js.map