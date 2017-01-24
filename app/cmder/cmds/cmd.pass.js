"use strict";
const _1 = require('../');
function PASS(userInput) {
    try {
        return _1.valueExtracter('PASS', userInput);
    }
    catch (tryErr) {
        return '';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PASS;
