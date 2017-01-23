"use strict";
function throwError(message) {
    throw new Error(message);
}
exports.throwError = throwError;
function typeError(message) {
    throwError(`[TypeError] ` + message);
}
exports.typeError = typeError;
function syntaxError(message) {
    throwError('[Syntax Error] ' + message);
}
exports.syntaxError = syntaxError;
function undefinedError(message) {
    throwError('[Undefined] ' + message);
}
exports.undefinedError = undefinedError;
//# sourceMappingURL=util.throw-error.js.map