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
var programs_service_1 = require('./programs.service');
var ng2_pagination_1 = require('ng2-pagination/dist/ng2-pagination');
var storage_service_1 = require('./storage.service');
var stations_service_1 = require('./stations.service');
var station_pipe_1 = require('./station.pipe');
var filter_pipe_1 = require('./filter.pipe');
var notifications_service_1 = require('./notifications.service');
var ProgramsComponent = (function () {
    function ProgramsComponent(programsService, router, storageService, stationsService, notificationsService) {
        this.programsService = programsService;
        this.router = router;
        this.storageService = storageService;
        this.stationsService = stationsService;
        this.notificationsService = notificationsService;
        this.pageLoading = true;
        this.cacheSubscription = null;
        this.progs = [];
        this.stations_list = [];
        this.stations = {};
        this.filtered_station = 'all';
        this.filter = "";
        this.p = 0;
        this.filter_options = ["is:vulnerable",
            "is:!vulnerable",
            "version:",
            "station:"
        ];
    }
    ProgramsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.p = this.storageService.get("ProgramsComponent", "page", 1);
        this.updateList();
        var tour = this.storageService.get("Tour", "current_step", "");
        if (tour == "/programs") {
            var tour_current_step = "end";
            this.storageService.store("Tour", "current_step", tour_current_step);
        }
        this.cacheSubscription = this.programsService.cacheTimeout.subscribe(function () {
            _this.updateList();
        });
    };
    ProgramsComponent.prototype.ngOnDestroy = function () {
        if (this.cacheSubscription)
            this.cacheSubscription.unsubscribe();
    };
    ProgramsComponent.prototype.updateList = function () {
        var _this = this;
        this.pageLoading = true;
        this.stationsService.getStationsList().subscribe(function (stations) {
            _this.stations_list = stations;
            for (var _i = 0, stations_1 = stations; _i < stations_1.length; _i++) {
                var st = stations_1[_i];
                _this.stations[st.id] = st.name;
            }
            _this.updateListProgOnly();
        }, function (error) {
            _this.pageLoading = false;
            if (error == "NeedToReconnect")
                throw error;
        });
    };
    ProgramsComponent.prototype.updateListProgOnly = function () {
        var _this = this;
        this.pageLoading = true;
        this.programsService.getProgramsList()
            .subscribe(function (programs) {
            for (var i = 0; i < programs.length; i++)
                programs[i].station_name = _this.stations[programs[i].poste];
            _this.progs = programs;
            _this.pageLoading = false;
        }, function (error) {
            _this.pageLoading = false;
            if (error == "NeedToReconnect")
                throw error;
            console.log(error);
        });
    };
    ProgramsComponent.prototype.onClick = function (id) {
        this.router.navigate(['/programs', id]);
    };
    ProgramsComponent.prototype.onClickDelete = function (id, index_array) {
        var _this = this;
        this.programsService.deleteProgram(id)
            .subscribe(function (programs) {
            index_array = index_array + (_this.p - 1) * 100;
            var tmp = _this.progs.slice(0, index_array);
            if (index_array + 1 < _this.progs.length)
                tmp = tmp.concat(_this.progs.slice(index_array + 1));
            _this.progs = tmp;
        }, function (error) {
            if (error == "NeedToReconnect")
                throw error;
            if (error.code == 404)
                _this.updateList();
            else
                _this.notificationsService.alert(error.msg);
        });
    };
    ProgramsComponent.prototype.onNewProgram = function () {
        this.router.navigate(['/programs', "new"]);
    };
    ProgramsComponent.prototype.onPageChange = function (page) {
        this.storageService.store("ProgramsComponent", "page", page);
    };
    ProgramsComponent.prototype.selectStation = function (st) {
        this.filtered_station = st;
    };
    ProgramsComponent.prototype.onClickFilter = function (f) {
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
    ProgramsComponent.prototype.onClickRefresh = function () {
        this.programsService.trigerEmitTimeout();
    };
    ProgramsComponent.prototype.onClickAlert = function (alert_id) {
        this.router.navigate(['/alerts', alert_id]);
    };
    ProgramsComponent = __decorate([
        core_1.Component({
            selector: 'programs',
            templateUrl: 'app/programs.component.html',
            directives: [ng2_pagination_1.PaginationControlsCmp],
            pipes: [ng2_pagination_1.PaginatePipe, station_pipe_1.StationPipe, filter_pipe_1.FilterPipe],
            providers: [ng2_pagination_1.PaginationService]
        }), 
        __metadata('design:paramtypes', [programs_service_1.ProgramsService, router_1.Router, storage_service_1.StorageService, stations_service_1.StationsService, notifications_service_1.NotificationsService])
    ], ProgramsComponent);
    return ProgramsComponent;
}());
exports.ProgramsComponent = ProgramsComponent;
//# sourceMappingURL=programs.component.js.map