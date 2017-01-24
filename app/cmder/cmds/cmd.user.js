"use strict";
const _1 = require("../");
function user(userInput) {
    try {
        return _1.valueExtracter('USER', userInput);
    }
    catch (tryErr) {
        return '';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = user;
