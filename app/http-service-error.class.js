"use strict";
var Observable_1 = require('rxjs/Observable');
var HttpServiceError = (function () {
    function HttpServiceError() {
        this.lastError = 0;
    }
    HttpServiceError.prototype.handleError = function (error) {
        var error_resp = {
            code: 0,
            msg: "",
            json: null
        };
        error_resp.code = error.status;
        error_resp.msg = error._body;
        try {
            var j = JSON.parse(error._body);
            if ("detail" in j)
                error_resp.msg = j["detail"];
            else {
                error_resp.msg = "";
                error_resp.json = j;
            }
        }
        catch (e) { }
        this.lastError = error_resp.code;
        if (error_resp.code == 401) {
            throw "NeedToReconnect";
        }
        return Observable_1.Observable.throw(error_resp);
    };
    return HttpServiceError;
}());
exports.HttpServiceError = HttpServiceError;
//# sourceMappingURL=http-service-error.class.js.map