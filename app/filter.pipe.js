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
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (list, str_filter) {
        var _this = this;
        if (str_filter == "")
            return list;
        var obj_type = "prog";
        if (list && list.length && "program_info" in list[0])
            obj_type = "alert";
        var rules = {
            "contain_str": [],
            "version": [],
            "station": [],
            "is": [],
            "state": []
        };
        var reversable = ["is", "state"];
        if (obj_type != "alert")
            delete rules.state;
        for (var _i = 0, _a = str_filter.split(" "); _i < _a.length; _i++) {
            var word = _a[_i];
            if (word == "")
                continue;
            var op_idx = word.indexOf(":");
            if (op_idx != -1) {
                var op_key = word.substring(0, op_idx);
                if (op_key in rules) {
                    var op_value = word.substring(op_idx + 1);
                    var reversed = false;
                    if (op_value.startsWith("!") && reversable.indexOf(op_key) != -1) {
                        reversed = true;
                        op_value = op_value.substring(1);
                    }
                    if (op_value != "")
                        rules[op_key].push({ "reversed": reversed, "value": op_value });
                }
                else
                    rules.contain_str.push(word);
            }
            else
                rules.contain_str.push(word);
        }
        var matching = list.filter(function (obj) {
            var name;
            var version;
            var station;
            if (obj_type == "prog") {
                name = obj.program_name;
                version = obj.program_version;
                station = obj.station_name;
            }
            else {
                name = obj.program_info.program_name;
                version = obj.program_info.program_version;
                station = obj.program_info.station_name;
            }
            var ret;
            if (rules.contain_str.length) {
                ret = false;
                for (var _i = 0, _a = rules.contain_str; _i < _a.length; _i++) {
                    var word = _a[_i];
                    ret = ret || name.toLowerCase().indexOf(word.toLowerCase()) !== -1;
                }
                if (!ret)
                    return ret;
            }
            if (rules.is.length) {
                ret = false;
                for (var _b = 0, _c = rules.is; _b < _c.length; _b++) {
                    var op_is = _c[_b];
                    if (op_is.value.startsWith("v") && obj_type == "prog")
                        ret = ret || (obj.alert_id != null) != op_is.reversed;
                    else if (op_is.value.startsWith("r") && obj_type == "alert")
                        ret = ret || (!!obj.view) != op_is.reversed;
                    else if (op_is.value.startsWith("n") && obj_type == "alert")
                        ret = ret || !((!!obj.view) != op_is.reversed);
                }
                if (!ret)
                    return ret;
            }
            if ("state" in rules) {
                ret = false;
                for (var _d = 0, _e = rules.state; _d < _e.length; _d++) {
                    var op_state = _e[_d];
                    if (op_state.value.startsWith("e"))
                        ret = ret || ((obj.state.indexOf("exploit") !== -1) != op_state.reversed);
                    else if (op_state.value.startsWith("p"))
                        ret = ret || ((obj.state.indexOf("patch") !== -1) != op_state.reversed);
                }
                if (rules.state.length && !ret)
                    return ret;
            }
            if (rules.version.length) {
                ret = false;
                for (var _f = 0, _g = rules.version; _f < _g.length; _f++) {
                    var op_version = _g[_f];
                    ret = ret || version.toLowerCase().indexOf(op_version.value.toLowerCase()) !== -1;
                }
                if (!ret)
                    return ret;
            }
            ret = false;
            for (var _h = 0, _j = rules.station; _h < _j.length; _h++) {
                var op_station = _j[_h];
                ret = ret || station.toLowerCase().indexOf(op_station.value.toLowerCase()) !== -1;
            }
            if (rules.station.length && !ret)
                return ret;
            return true;
        });
        matching = JSON.parse(JSON.stringify(matching));
        return matching.map(function (obj) {
            var name;
            var version;
            var station;
            if (obj_type == "prog") {
                name = obj.program_name;
                version = obj.program_version;
                station = obj.station_name;
            }
            else {
                name = obj.program_info.program_name;
                version = obj.program_info.program_version;
                station = obj.program_info.station_name;
            }
            name = _this.htmlEscape(name);
            version = _this.htmlEscape(version);
            station = _this.htmlEscape(station);
            name = _this.hl(name, rules.contain_str);
            if (rules.version.length)
                version = _this.hl(version, rules.version.map(function (o) { return o.value; }));
            if (rules.station.length)
                station = _this.hl(station, rules.station.map(function (o) { return o.value; }));
            if (obj_type == "prog") {
                obj.program_name = name;
                obj.program_version = version;
                obj.station_name = station;
            }
            else {
                obj.program_info.program_name = name;
                obj.program_info.program_version = version;
                obj.program_info.station_name = station;
            }
            return obj;
        });
    };
    FilterPipe.prototype.hl = function (str, values) {
        if (!values.length)
            return str;
        var re = new RegExp(values.join("|"), "gi");
        str = str.replace(re, function (matched) {
            return '<span class="filterHl">' + matched + '</span>';
        });
        return str;
    };
    FilterPipe.prototype.htmlEscape = function (val) {
        val = val.replace("<", "&lt;");
        val = val.replace(">", "&gt;");
        return val;
    };
    FilterPipe = __decorate([
        core_1.Pipe({ name: 'filter' }), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
}());
exports.FilterPipe = FilterPipe;
//# sourceMappingURL=filter.pipe.js.map