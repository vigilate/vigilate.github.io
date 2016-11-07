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
var StorageService = (function () {
    function StorageService() {
        this.storage = {};
        this.updated = new core_1.EventEmitter();
    }
    StorageService.prototype.store = function (client, key, value) {
        if (!(client in this.storage)) {
            this.storage[client] = {};
        }
        this.storage[client][key] = value;
        this.updated.emit({ "client": client, "key": key, "value": value });
    };
    StorageService.prototype.get = function (client, key, def) {
        if (!(client in this.storage)) {
            return def;
        }
        if (!(key in this.storage[client])) {
            return def;
        }
        return this.storage[client][key];
    };
    StorageService.prototype.delete = function (client, key) {
        if (!(client in this.storage)) {
            return;
        }
        if (!(key in this.storage[client])) {
            return;
        }
        delete this.storage[client][key];
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageService.prototype, "updated", void 0);
    StorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map