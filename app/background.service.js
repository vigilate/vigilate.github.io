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
var user_service_1 = require('./user.service');
var notifications_service_1 = require('./notifications.service');
var BackgroundService = (function () {
    function BackgroundService(userService, notificationsService) {
        this.userService = userService;
        this.notificationsService = notificationsService;
        this.cntAlertChange = new core_1.EventEmitter();
        this.cntTotalAlert = new core_1.EventEmitter();
        this.cntTotalProg = new core_1.EventEmitter();
        this.cntTotalStation = new core_1.EventEmitter();
        this.update_interval = 10;
        this.intervalId = -1;
        this.last_update_request = 0;
        this.is_new = true;
        this.stats = null;
        this.stats_dic = {
            "alerts": { name: "alert", "+": "alert", "-": "success" },
            "programs": { name: "program", "+": "info", "-": "info" },
            "stations": { name: "station", "+": "info", "-": "info" }
        };
    }
    BackgroundService.prototype.init = function () {
        var _this = this;
        if (this.intervalId == -1) {
            this.intervalId = setInterval(function () {
                _this.update();
            }, this.update_interval * 1000);
        }
        this.update();
    };
    BackgroundService.prototype.update = function () {
        var _this = this;
        var current_time = new Date().getTime() / 1000;
        if (current_time - this.last_update_request < 1)
            return;
        this.last_update_request = current_time;
        this.is_new = false;
        this.userService.getStats()
            .subscribe(function (stats) {
            _this.processNotification(stats);
            _this.stats = stats;
            _this.cntAlertChange.emit(stats.new_alerts);
            _this.cntTotalAlert.emit(stats.alerts);
            _this.cntTotalProg.emit(stats.programs);
            _this.cntTotalStation.emit(stats.stations);
        });
    };
    BackgroundService.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    BackgroundService.prototype.processNotification = function (stats) {
        if (this.stats == null)
            return;
        for (var _i = 0, _a = Object.keys(this.stats_dic); _i < _a.length; _i++) {
            var key = _a[_i];
            var name_1 = this.stats_dic[key].name;
            var diff = stats[key] - this.stats[key];
            var plural = Math.abs(diff) > 1;
            var sign = diff > 0 ? "+" : "-";
            if (!diff)
                continue;
            var msg = " "
                + name_1
                + (plural ? "s" : "")
                + " has been "
                + (sign == "+" ? "added" : "removed")
                + ".";
            this.notificationsService.push(this.stats_dic[key][sign], Math.abs(diff) + msg);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BackgroundService.prototype, "cntAlertChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BackgroundService.prototype, "cntTotalAlert", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BackgroundService.prototype, "cntTotalProg", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BackgroundService.prototype, "cntTotalStation", void 0);
    BackgroundService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, notifications_service_1.NotificationsService])
    ], BackgroundService);
    return BackgroundService;
}());
exports.BackgroundService = BackgroundService;
//# sourceMappingURL=background.service.js.map