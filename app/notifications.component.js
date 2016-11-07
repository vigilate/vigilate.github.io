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
var notifications_service_1 = require('./notifications.service');
var NotificationsComponent = (function () {
    function NotificationsComponent(notificationsService) {
        this.notificationsService = notificationsService;
        this.notifications = [];
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.notificationsService.eventNew.subscribe(function (notif) {
            _this.notifications.push(notif);
        });
        this.notificationsService.eventExpired.subscribe(function (id) {
            var idx_slice = -1;
            for (var i = 0; i < _this.notifications.length; i++) {
                if (_this.notifications[i].id == id) {
                    _this.notifications[i].expiring = true;
                    break;
                }
            }
            setTimeout(function () { _this.deleteItem(id); }, 1000);
        });
    };
    NotificationsComponent.prototype.deleteItem = function (id) {
        var idx_slice = -1;
        for (var i = 0; i < this.notifications.length; i++) {
            if (this.notifications[i].id == id) {
                idx_slice = i;
                break;
            }
        }
        if (idx_slice != -1) {
            var tmp = this.notifications.slice(0, idx_slice);
            tmp = tmp.concat(this.notifications.slice(idx_slice + 1));
            this.notifications = tmp;
        }
    };
    NotificationsComponent = __decorate([
        core_1.Component({
            selector: 'notifications',
            templateUrl: 'app/notifications.component.html'
        }), 
        __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
    ], NotificationsComponent);
    return NotificationsComponent;
}());
exports.NotificationsComponent = NotificationsComponent;
//# sourceMappingURL=notifications.component.js.map