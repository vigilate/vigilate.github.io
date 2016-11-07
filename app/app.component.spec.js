/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var app_component_1 = require('./app.component');
var auth_service_1 = require('./auth.service');
var alerts_service_1 = require('./alerts.service');
var programs_service_1 = require('./programs.service');
var http_service_error_class_1 = require('./http-service-error.class');
var backend_class_1 = require('./backend.class');
var background_service_1 = require('./background.service');
var stations_service_1 = require('./stations.service');
var user_service_1 = require('./user.service');
var api_service_1 = require('./api.service');
var router_1 = require('@angular/router');
var storage_service_1 = require('./storage.service');
var notifications_service_1 = require('./notifications.service');
var MockRouter = (function () {
    function MockRouter() {
    }
    MockRouter.prototype.createUrlTree = function () { };
    return MockRouter;
}());
var MockActivatedRoute = (function () {
    function MockActivatedRoute() {
    }
    return MockActivatedRoute;
}());
testing_1.beforeEachProviders(function () { return [
    app_component_1.AppComponent,
    auth_service_1.AuthService,
    http_service_error_class_1.HttpServiceError,
    programs_service_1.ProgramsService,
    alerts_service_1.AlertsService,
    http_1.BaseRequestOptions,
    testing_2.MockBackend,
    backend_class_1.Backend,
    background_service_1.BackgroundService,
    stations_service_1.StationsService,
    user_service_1.UserService,
    api_service_1.Api,
    storage_service_1.StorageService,
    notifications_service_1.NotificationsService,
    core_1.provide(router_1.Router, { useClass: MockRouter }),
    core_1.provide(router_1.ActivatedRoute, { useClass: MockActivatedRoute }),
    core_1.provide(http_1.Http, {
        useFactory: function (backend, defaultOptions) {
            return new http_1.Http(backend, defaultOptions);
        },
        deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
    })
]; });
testing_1.describe('App: VigilateFrontend', function () {
    testing_1.it('should create the app', testing_1.inject([app_component_1.AppComponent], function (app) {
        testing_1.expect(app).toBeTruthy();
    }));
});
//# sourceMappingURL=app.component.spec.js.map