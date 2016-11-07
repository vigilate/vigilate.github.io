"use strict";
var Backend = (function () {
    function Backend() {
        this.host = "https://vigilate.eax.ovh";
        this.api_path = "/api/v1";
        if (localStorage.getItem("host") != null)
            this.setHost(localStorage.getItem("host"));
    }
    Backend.prototype.getHost = function () {
        return this.host;
    };
    Backend.prototype.getUrl = function () {
        return this.host + this.api_path;
    };
    Backend.prototype.setHost = function (host) {
        localStorage.setItem("host", host);
        this.host = host;
    };
    return Backend;
}());
exports.Backend = Backend;
//# sourceMappingURL=backend.class.js.map