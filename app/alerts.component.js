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
var ng2_pagination_1 = require('ng2-pagination/dist/ng2-pagination');
var stations_service_1 = require('./stations.service');
var storage_service_1 = require('./storage.service');
var station_pipe_1 = require('./station.pipe');
var filter_pipe_1 = require('./filter.pipe');
var AlertsComponent = (function () {
    function AlertsComponent(authService, alertsService, router, storageService, stationsService) {
        this.authService = authService;
        this.alertsService = alertsService;
        this.router = router;
        this.storageService = storageService;
        this.stationsService = stationsService;
        this.pageLoading = true;
        this.cacheSubscription = null;
        this.alerts = [];
        this.p = 0;
        this.stations_list = [];
        this.stations = {};
        this.filtered_station = 'all';
        this.loadingMarkAll = {
            read: false,
            unread: false
        };
        this.filter = "";
        this.filter_options = ["is:read",
            "is:!read",
            "state:exploit",
            "state:patch",
            "version:",
            "station:"
        ];
    }
    AlertsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.p = this.storageService.get("AlertsComponent", "page", 1);
        this.updateList();
        this.cacheSubscription = this.alertsService.cacheTimeout.subscribe(function () {
            _this.updateList();
        });
    };
    AlertsComponent.prototype.ngOnDestroy = function () {
        if (this.cacheSubscription)
            this.cacheSubscription.unsubscribe();
    };
    AlertsComponent.prototype.updateList = function () {
        var _this = this;
        this.pageLoading = true;
        this.stationsService.getStationsList().subscribe(function (stations) {
            _this.stations_list = stations;
            for (var _i = 0, stations_1 = stations; _i < stations_1.length; _i++) {
                var st = stations_1[_i];
                _this.stations[st.id] = st.name;
            }
            _this.updateListAlertOnly();
        }, function (error) {
            _this.pageLoading = false;
            if (error == "NeedToReconnect")
                throw error;
        });
    };
    AlertsComponent.prototype.updateListAlertOnly = function () {
        var _this = this;
        this.pageLoading = true;
        this.alertsService.getAlertsList()
            .subscribe(function (alerts) {
            for (var i = 0; i < alerts.length; i++) {
                alerts[i].loadingMark = false;
                alerts[i].program_info.station_name = _this.stations[alerts[i].program_info.poste];
            }
            _this.alerts = alerts;
            _this.pageLoading = false;
        }, function (error) {
            _this.pageLoading = false;
            if (error == "NeedToReconnect")
                throw error;
            console.log(error);
        });
    };
    AlertsComponent.prototype.onClick = function (id) {
        this.router.navigate(['/alerts', id]);
    };
    AlertsComponent.prototype.onPageChange = function (page) {
        this.storageService.store("AlertsComponent", "page", page);
    };
    AlertsComponent.prototype.onMark = function (obj) {
        var _this = this;
        obj.loadingMark = true;
        if (obj.view) {
            this.alertsService.markUnread(obj.id)
                .subscribe(function (ret) {
                obj.loadingMark = false;
                _this.alertsService.trigerEmitTimeout();
            }, function (error) {
                obj.loadingMark = false;
                if (error == "NeedToReconnect")
                    throw error;
                console.log(error);
            });
        }
        else {
            this.alertsService.markRead(obj.id)
                .subscribe(function (ret) {
                obj.loadingMark = false;
                _this.alertsService.trigerEmitTimeout();
            }, function (error) {
                obj.loadingMark = false;
                if (error == "NeedToReconnect")
                    throw error;
                console.log(error);
            });
        }
    };
    AlertsComponent.prototype.onMarkAll = function (act) {
        var _this = this;
        this.loadingMarkAll[act] = true;
        var fct;
        if (act == 'unread')
            fct = this.alertsService.markAllUnread();
        else
            fct = this.alertsService.markAllRead();
        fct.subscribe(function (ret) {
            _this.loadingMarkAll[act] = false;
            _this.alertsService.trigerEmitTimeout();
        }, function (error) {
            _this.loadingMarkAll[act] = false;
            if (error == "NeedToReconnect")
                throw error;
            console.log(error);
        });
    };
    AlertsComponent.prototype.selectStation = function (st) {
        this.filtered_station = st;
    };
    AlertsComponent.prototype.onClickFilter = function (f) {
        if (this.filter.indexOf(f) != -1)
            return;
        if (f.indexOf("!") != -1) {
            var tmp = f.replace(":!", ":");
            if (this.filter.indexOf(tmp) != -1) {
                this.filter = this.filter.replace(tmp, f);
                return;
            }
        }
        else {
            var tmp = f.replace(":", ":!");
            if (this.filter.indexOf(tmp) != -1) {
                this.filter = this.filter.replace(tmp, f);
                return;
            }
        }
        this.filter = this.filter + " " + f;
    };
    AlertsComponent.prototype.onClickRefresh = function () {
        this.alertsService.trigerEmitTimeout();
    };
    AlertsComponent = __decorate([
        core_1.Component({
            selector: 'alerts',
            templateUrl: 'app/alerts.component.html',
            directives: [ng2_pagination_1.PaginationControlsCmp],
            pipes: [ng2_pagination_1.PaginatePipe, station_pipe_1.StationPipe, filter_pipe_1.FilterPipe],
            providers: [ng2_pagination_1.PaginationService]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, alerts_service_1.AlertsService, router_1.Router, storage_service_1.StorageService, stations_service_1.StationsService])
    ], AlertsComponent);
    return AlertsComponent;
}());
exports.AlertsComponent = AlertsComponent;
//# sourceMappingURL=alerts.component.js.map