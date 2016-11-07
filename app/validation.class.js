"use strict";
var PhoneValidator = (function () {
    function PhoneValidator() {
    }
    PhoneValidator.isPrefixed = function (control) {
        if (control.value != "" && control.value != null && control.value.charAt(0) == "+")
            return null;
        return { "isPrefixed": true };
    };
    return PhoneValidator;
}());
exports.PhoneValidator = PhoneValidator;
exports.MatchValidator = function (ctrl, toBeMatched) {
    return function (control) {
        if (ctrl[toBeMatched] && control.value != ctrl[toBeMatched].value)
            return { "match": true };
        return null;
    };
};
exports.TriggerValidator = function (ctrl, toBeMatched) {
    return function (control) {
        if (ctrl[toBeMatched]) {
            ctrl[toBeMatched].updateValueAndValidity();
        }
        return null;
    };
};
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        if (control.value == "" || control.value == null)
            return null;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(control.value))
            return null;
        return { "isValidEmail": true };
    };
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=validation.class.js.map