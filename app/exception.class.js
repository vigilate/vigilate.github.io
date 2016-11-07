"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var background_service_1 = require('./background.service');
// Inspired from http://stackoverflow.com/questions/37592078
var _ArrayLogger = (function () {
    function _ArrayLogger() {
        this.res = [];
    }
    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroupEnd = function () { };
    ;
    return _ArrayLogger;
}());
exports._ArrayLogger = _ArrayLogger;
var MyExceptionHandler = (function (_super) {
    __extends(MyExceptionHandler, _super);
    function MyExceptionHandler(injector) {
        _super.call(this, new _ArrayLogger(), true);
        this.injector = injector;
    }
    MyExceptionHandler.prototype.call = function (error, stackTrace, reason) {
        if (stackTrace === void 0) { stackTrace = null; }
        if (reason === void 0) { reason = null; }
        this.getDependencies();
        if (error == "NeedToReconnect") {
            this.router.navigate(['/logout']);
        }
        else
            _super.prototype.call.call(this, error, stackTrace, reason);
    };
    MyExceptionHandler.prototype.getDependencies = function () {
        if (!this.router) {
            this.router = this.injector.get(router_1.Router);
        }
        if (!this.authService) {
            this.authService = this.injector.get(auth_service_1.AuthService);
        }
        if (!this.backgroundService) {
            this.backgroundService = this.injector.get(background_service_1.BackgroundService);
        }
    };
    MyExceptionHandler = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.Injector])
    ], MyExceptionHandler);
    return MyExceptionHandler;
}(core_1.ExceptionHandler));
exports.MyExceptionHandler = MyExceptionHandler;
//# sourceMappingURL=exception.class.js.map