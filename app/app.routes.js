"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./dashboard.component');
var login_component_1 = require('./login.component');
var logout_component_1 = require('./logout.component');
var programs_component_1 = require('./programs.component');
var programs_detail_component_1 = require('./programs-detail.component');
var auth_guard_1 = require('./auth.guard');
var auth_service_1 = require('./auth.service');
var programs_service_1 = require('./programs.service');
var user_service_1 = require('./user.service');
var http_service_error_class_1 = require('./http-service-error.class');
var alerts_service_1 = require('./alerts.service');
var storage_service_1 = require('./storage.service');
var background_service_1 = require('./background.service');
var stations_service_1 = require('./stations.service');
var alerts_component_1 = require('./alerts.component');
var stations_component_1 = require('./stations.component');
var settings_component_1 = require('./settings.component');
var alerts_detail_component_1 = require('./alerts-detail.component');
var stations_detail_component_1 = require('./stations-detail.component');
var backend_class_1 = require('./backend.class');
var api_service_1 = require('./api.service');
var notifications_service_1 = require('./notifications.service');
var stripe_service_1 = require('./stripe.service');
var plans_service_1 = require('./plans.service');
exports.routes = [
    { path: '/dashboard',
        component: dashboard_component_1.DashboardComponent,
        index: true,
        canActivate: [auth_guard_1.AuthGuard] },
    { path: '/login', component: login_component_1.LoginComponent },
    { path: '/logout', component: logout_component_1.LogoutComponent },
    { path: '/programs', component: programs_component_1.ProgramsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '/programs/:id', component: programs_detail_component_1.ProgramsDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '/alerts', component: alerts_component_1.AlertsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '/alerts/:id', component: alerts_detail_component_1.AlertsDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '/settings', component: settings_component_1.SettingsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '/stations', component: stations_component_1.StationsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '/stations/:id', component: stations_detail_component_1.StationsDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes),
    [auth_guard_1.AuthGuard, auth_service_1.AuthService, programs_service_1.ProgramsService, user_service_1.UserService, http_service_error_class_1.HttpServiceError, backend_class_1.Backend, alerts_service_1.AlertsService, storage_service_1.StorageService, background_service_1.BackgroundService, stations_service_1.StationsService, api_service_1.Api, notifications_service_1.NotificationsService, stripe_service_1.StripeService, plans_service_1.PlansService]
];
//# sourceMappingURL=app.routes.js.map