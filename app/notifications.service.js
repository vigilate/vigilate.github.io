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
var NotificationsService = (function () {
    function NotificationsService() {
        this.eventNew = new core_1.EventEmitter();
        this.eventExpired = new core_1.EventEmitter();
        this.current_id = 0;
    }
    NotificationsService.prototype.push = function (type, message, timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 5; }
        this.current_id++;
        var id = this.current_id;
        var notif = { id: id, msg: message, type: type, expiring: false };
        this.eventNew.emit(notif);
        if (timeout != 0) {
            setTimeout(function () {
                _this.eventExpired.emit(id);
            }, timeout * 1000);
        }
    };
    NotificationsService.prototype.info = function (message, timeout) {
        if (timeout === void 0) { timeout = 5; }
        this.push("info", message, timeout);
    };
    NotificationsService.prototype.success = function (message, timeout) {
        if (timeout === void 0) { timeout = 5; }
        this.push("success", message, timeout);
    };
    NotificationsService.prototype.alert = function (message, timeout) {
        if (timeout === void 0) { timeout = 5; }
        this.push("alert", message, timeout);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NotificationsService.prototype, "eventNew", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NotificationsService.prototype, "eventExpired", void 0);
    NotificationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NotificationsService);
    return NotificationsService;
}());
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map