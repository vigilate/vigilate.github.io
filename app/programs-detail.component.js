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
var user_service_1 = require('./user.service');
var programs_service_1 = require('./programs.service');
var stations_service_1 = require('./stations.service');
var common_1 = require('@angular/common');
var notifications_service_1 = require('./notifications.service');
var ProgramsDetailComponent = (function () {
    function ProgramsDetailComponent(userService, programsService, router, route, stationsService, builder, notificationsService) {
        this.userService = userService;
        this.programsService = programsService;
        this.router = router;
        this.route = route;
        this.stationsService = stationsService;
        this.builder = builder;
        this.notificationsService = notificationsService;
        this.loadingSubmit = false;
        this.alerts = [];
        this.have_changes = false;
        this.program_params = [
            { name: "Name", key: "program_name" },
            { name: "Version", key: "program_version" }
        ];
        this.creating_new = false;
        this.stations = [];
        this.selectedStation = -1;
        this.station_new_name = "";
        this.alert_custom_origin = {
            def: true,
            sms: { score: 0, activated: false },
            mail: { score: 0, activated: false },
        };
        this.clicked = false;
        this.ctrl = {
            form: null,
            program_name: null,
            program_version: null,
        };
        this.error_field = {};
    }
    ProgramsDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ctrl.program_name = new common_1.Control("", common_1.Validators.required);
        this.ctrl.program_version = new common_1.Control("", common_1.Validators.required);
        this.ctrl.form = this.builder.group({
            program_name: this.ctrl.program_name,
            program_version: this.ctrl.program_version
        });
        var sub = this.route.params.subscribe(function (params) {
            if (params['id'] != "new") {
                var id = +params['id'];
                _this.programsService.getProgramsDetail(id).subscribe(function (program) {
                    _this.program_obj_origin = JSON.parse(JSON.stringify(program));
                    _this.program_obj = program;
                    _this.initAlertCustomFromData(_this.program_obj_origin, _this.alert_custom_origin);
                    _this.alert_custom = JSON.parse(JSON.stringify(_this.alert_custom_origin));
                    _this.selectedStation = _this.program_obj["poste"];
                    _this.ctrl.program_name.updateValue(_this.program_obj.program_name);
                    _this.ctrl.program_version.updateValue(_this.program_obj.program_version);
                }, function (error) {
                    if (error == "NeedToReconnect")
                        throw error;
                    _this.programsService.discardCache();
                    _this.onGoBackList();
                });
                _this.reloadStations();
            }
            else {
                _this.creating_new = true;
                _this.program_obj_origin = { "program_name": "", "program_version": "",
                    "minimum_score": "", "user": _this.userService.user
                        .id,
                    "alert_type_default": true, "email_score": 0,
                    "sms_score": 0, "email_enabled": true,
                    "sms_enabled": true, "poste": 0
                };
                _this.program_obj = JSON.parse(JSON.stringify(_this.program_obj_origin));
                _this.initAlertCustomFromData(_this.program_obj_origin, _this.alert_custom_origin);
                _this.alert_custom = JSON.parse(JSON.stringify(_this.alert_custom_origin));
                _this.reloadStations();
                _this.selectedStation = -1;
            }
        });
    };
    ProgramsDetailComponent.prototype.reloadStations = function () {
        var _this = this;
        this.stationsService.getStationsList().subscribe(function (stations) {
            _this.stations = [{ "id": -1, "name": "Create new station" }];
            _this.stations = _this.stations.concat(stations);
            _this.selectedStation = _this.stations[_this.stations.length - 1].id;
        }, function (error) {
            if (error == "NeedToReconnect")
                throw error;
        });
    };
    ProgramsDetailComponent.prototype.onChange = function (key, ev) {
        this.program_obj[key] = ev.target.value;
        this.updateHaveChange();
    };
    ProgramsDetailComponent.prototype.updateHaveChange = function () {
        var tmp_changes = false;
        for (var i = 0; i < this.program_params.length; i++) {
            var k = this.program_params[i]["key"];
            tmp_changes = tmp_changes || (this.program_obj_origin[k] != this.program_obj[k]);
        }
        tmp_changes = tmp_changes || (this.program_obj_origin.poste != this.selectedStation);
        tmp_changes = tmp_changes || (this.alert_custom_origin.def != this.alert_custom.def);
        tmp_changes = tmp_changes || (this.alert_custom_origin.sms.activated != this.alert_custom.sms.activated);
        tmp_changes = tmp_changes || (this.alert_custom_origin.mail.activated != this.alert_custom.mail.activated);
        tmp_changes = tmp_changes || (this.alert_custom_origin.sms.score != this.alert_custom.sms.score);
        tmp_changes = tmp_changes || (this.alert_custom_origin.mail.score != this.alert_custom.mail.score);
        this.have_changes = tmp_changes;
    };
    ProgramsDetailComponent.prototype.delayedUpdateHaveChange = function () {
        var _this = this;
        setTimeout(function () { return _this.updateHaveChange(); }, 100);
    };
    ProgramsDetailComponent.prototype.onSubmit = function () {
        var _this = this;
        this.error_field = {};
        this.clicked = true;
        var station_valid = true;
        if (this.selectedStation == -1 && this.station_new_name == "") {
            this.error_field["name"] = "If you create a new station, it is required to give it a name.";
            station_valid = false;
        }
        if (!this.ctrl.form.valid || !station_valid)
            return;
        this.loadingSubmit = true;
        if (this.selectedStation == -1) {
            this.stationsService.createStation(this.station_new_name).subscribe(function (station) {
                _this.stationsService.discardCache();
                _this.reloadStations();
                _this.selectedStation = station.id;
                _this.onSubmit();
            }, function (error) {
                if (error == "NeedToReconnect")
                    throw error;
                if (error.json) {
                    for (var f in error.json) {
                        _this.error_field[f] = error.json[f].join(" ");
                    }
                }
            });
            return;
        }
        this.program_obj.alert_type_default = this.alert_custom.def;
        this.program_obj.sms_score = this.alert_custom.sms.score;
        this.program_obj.email_score = this.alert_custom.mail.score;
        this.program_obj.sms_enabled = this.alert_custom.sms.activated;
        this.program_obj.email_enabled = this.alert_custom.mail.activated;
        this.program_obj.poste = this.selectedStation;
        if (this.creating_new) {
            var tmp_prog_obj = this.program_obj;
            tmp_prog_obj.program_version = [tmp_prog_obj.program_version];
            this.programsService.createProgram(tmp_prog_obj).subscribe(function (program) {
                _this.loadingSubmit = false;
                _this.router.navigate(['/programs']);
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
        }
        else {
            var tmp_prog_obj = this.program_obj;
            tmp_prog_obj.program_version = [tmp_prog_obj.program_version];
            this.programsService.updateProgramsDetail(this.program_obj.id, tmp_prog_obj).subscribe(function (program) {
                _this.loadingSubmit = false;
                _this.program_obj_origin = JSON.parse(JSON.stringify(program));
                _this.initAlertCustomFromData(_this.program_obj_origin, _this.alert_custom_origin);
                _this.alert_custom = JSON.parse(JSON.stringify(_this.alert_custom_origin));
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
                    _this.notificationsService.alert("This program has been deleted and can't be updated anymore.");
                    _this.stationsService.discardCache();
                    _this.onGoBackList();
                }
            });
        }
    };
    ProgramsDetailComponent.prototype.initAlertCustomFromData = function (prog_data, alert_data) {
        alert_data.def = prog_data.alert_type_default;
        alert_data.sms.score = prog_data.sms_score;
        alert_data.mail.score = prog_data.email_score;
        alert_data.sms.activated = prog_data.sms_enabled;
        alert_data.mail.activated = prog_data.email_enabled;
    };
    ProgramsDetailComponent.prototype.onGoBackList = function () {
        this.router.navigate(['/programs']);
    };
    ProgramsDetailComponent = __decorate([
        core_1.Component({
            selector: 'programs-detail',
            templateUrl: 'app/programs-detail.component.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, programs_service_1.ProgramsService, router_1.Router, router_1.ActivatedRoute, stations_service_1.StationsService, common_1.FormBuilder, notifications_service_1.NotificationsService])
    ], ProgramsDetailComponent);
    return ProgramsDetailComponent;
}());
exports.ProgramsDetailComponent = ProgramsDetailComponent;
//# sourceMappingURL=programs-detail.component.js.map