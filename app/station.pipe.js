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
var StationPipe = (function () {
    function StationPipe() {
    }
    StationPipe.prototype.transform = function (list, arg_type, station_id) {
        if (arg_type == "prog")
            return list.filter(function (obj) {
                return station_id == "all" || obj.poste == station_id;
            });
        return list.filter(function (obj) {
            return station_id == "all" || obj.program_info.poste == station_id;
        });
    };
    StationPipe = __decorate([
        core_1.Pipe({ name: 'station' }), 
        __metadata('design:paramtypes', [])
    ], StationPipe);
    return StationPipe;
}());
exports.StationPipe = StationPipe;
//# sourceMappingURL=station.pipe.js.map