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
var CvssPipe = (function () {
    function CvssPipe() {
        this.CVSS_lvalue = {
            "access-vector": "This vulnerability can be accessed via <strong>%s</strong>.",
            "access-complexity": "The complexity of exploiting this vulnerability is <strong>%s</strong>.",
            "authentication": "This vulnerability requires <strong>%s</strong> authentification to be exploited.",
            "confidentiality-impact": "This vulnerability lead to <strong>%s</strong> confidentiality impact.",
            "integrity-impact": "This vulnerability lead to <strong>%s</strong> integrity impact.",
            "availability-impact": "This vulnerability lead to <strong>%s</strong> availability impact."
        };
    }
    CvssPipe.prototype.transform = function (cvss_part) {
        if (cvss_part) {
            var splited = cvss_part.split(":");
            var to_insert = splited[1].replace("NONE", "NO");
            to_insert = to_insert.replace("<", "&lt;");
            to_insert = to_insert.replace(">", "&gt;");
            return this.CVSS_lvalue[splited[0]].replace("%s", to_insert);
        }
        return "";
    };
    CvssPipe = __decorate([
        core_1.Pipe({ name: 'cvss' }), 
        __metadata('design:paramtypes', [])
    ], CvssPipe);
    return CvssPipe;
}());
exports.CvssPipe = CvssPipe;
//# sourceMappingURL=cvss.pipe.js.map