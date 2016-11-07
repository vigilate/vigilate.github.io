"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var app_routes_1 = require('./app/app.routes');
var common_1 = require('@angular/common');
var exception_class_1 = require('./app/exception.class');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [http_1.HTTP_PROVIDERS, app_routes_1.APP_ROUTER_PROVIDERS, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, { provide: core_1.ExceptionHandler, useClass: exception_class_1.MyExceptionHandler }]);
//# sourceMappingURL=main.js.map